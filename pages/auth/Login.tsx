import { faClose, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { Component } from "react";

export default class Login extends Component<{},{email:string;password:string;err:string}>{

    constructor(props){
        super(props);
        this.state = {
            err:'',
            email:'',
            password:''
        }
        this.Submit = this.Submit.bind(this);
    }

    show:boolean = false;
    isLoading:boolean = false;

    componentDidMount(): void {
        const id = localStorage.getItem('userid')
        const token = localStorage.getItem('token')
        if(id || token){
            Router.push('/')
        }
    }
    Submit(e){
        e.preventDefault();
        if(this.state.email === '' || this.state.password === '') {
            this.setState({err:"All Fields are Required"});
            this.show = true;
        }else{
            this.isLoading = true;
            const body = {
                email: this.state.email,
                password: this.state.password
            }
            axios.post("http://localhost:8000/api/user/login/",body).then(res=>{
                console.log(res);
                localStorage.setItem("userid",res.data.user._id);
                localStorage.setItem("token",res.data.token);
                Router.push('/')
                this.isLoading = false
            }).catch(e=>{
                console.log(e.response.data)
                this.show = true;
                this.setState({err:e.response.data})
                this.isLoading = false
            })
        }
    }

    btnClose = () => {
        this.show = false;
        this.setState({err:''});
    }

    render():React.ReactNode{
        return(
            <div className="h-screen flex flex-col justify-center items-center">
                <Head>
                    <title>BookKart-Login</title>
                </Head>
                <div className="w-full bg-black shadow-lg fixed top-0">
                    <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <Link href="/">
                                <h2 className="text-2xl font-bold text-white">Book-Kart</h2>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container flex flex-col items-center justify-start backdrop-blur-sm backdrop-brightness-95 shadow-lg rounded-md w-96 h-96">
                    <h1 className="text-3xl font-bold text-white mt-5 flex">Welcome Back<div className="wave">❕</div></h1>
                    <h1 className="text-xl text-white font-bold">Book-Kart</h1>
                    <div>
                        <form onSubmit={this.Submit}>
                            <div className="flex flex-col items-center justify-center mt-10 text-white">
                                <h1 className="w-full flex justify-start">Email : </h1>
                                <input type="email" name="email" placeholder="yourid@mail.com" className="w-72 h-10 rounded-md border-2 border-white text-white focus:outline-none bg-transparent p-2 focus:shadow-md mb-2" onChange={e=>{this.setState({email:e.target.value})}}  />
                                <h1 className="w-full flex justify-start">Password : </h1>
                                <input type="password" placeholder="********" className="w-72 h-10 rounded-md border-2 border-white text-white focus:outline-none bg-transparent p-2 focus:shadow-md mt-2"  onChange={e=>{this.setState({password:e.target.value})}} />
                                {this.isLoading ? <button className="w-72 h-10 rounded-md text-white mt-5 bg-blue-500 flex justify-center items-center cursor-not-allowed" disabled>
                                <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                    Loading...
                                </button>
                                :<button className="w-72 h-10 rounded-md text-white mt-5 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Login</button>}
                            </div>
                        </form>
                    </div>
                    <hr className="w-80% border-b-[1px] rounded-md border-gray-300 mt-3" />
                    <div>Dont Have an Account <Link href='Signup' className="cursor-pointer text-blue-600">Signup?</Link></div>
                </div>
                {this.show === false ? null : <div className="mt-5 p-2 w-72 h-12 flex justify-center items-center border-none rounded-md bg-red-600">
                    <div className="w-full flex justify-between items-center">
                        <p className="text-white">{this.state.err}</p>
                        <button onClick={this.btnClose} ><FontAwesomeIcon icon={faClose} className='cursor-pointer'/></button>
                    </div>
                </div>}
            </div>
        )
    }
}