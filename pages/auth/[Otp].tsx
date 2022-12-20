import { faClose, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { strict } from "assert";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { Component } from "react";
import OtpInput from "react-otp-input";

export default class Otp extends Component <{},{num:string;err:string;email:string}>{
    constructor(props){
        super(props);
        this.state = {
            num:'',
            err:'',
            email:''
        }
        this.submit = this.submit.bind(this);
        this.btnClose = this.btnClose.bind(this);
    }

    params(){
        const {Otp} = Router.query
        console.log(Otp.toString());
        this.setState({email:Otp.toString()});
    }

    componentDidMount(){
        this.params();
    }

    alrt:boolean = false
    isLoading:boolean = false;

    async submit(e){
        e.preventDefault();
        if(this.state.num === ''){
            this.setState({err:'Enter an otp'});
            this.alrt = true;
        }else{
            this.isLoading = true;
            const body = {
                email:this.state.email,
                otp:this.state.num,
            }
            console.log(body);
            axios.post(`http://localhost:8000/api/user/addUser/Otp/`,body).then(res=>{
                console.log(res.data.message);
                console.log(this.state.num);
                this.isLoading = false;
                Router.push('Login')
            }).catch(e=>{
                console.log(e);
                this.isLoading = false
            })
        }
    }

    btnClose(){
        this.alrt = false;
        this.setState({err:''});
    }

    handleChange = (code) => this.setState({num:code});

    num:number = 1;
    render():React.ReactNode{
        return(
            <div className="h-screen flex flex-col justify-center items-center">
                <Head>
                    <title>BookKart-OTP</title>
                </Head>
                <div className="container flex flex-col items-center justify-start backdrop-blur-sm backdrop-brightness-95 shadow-lg rounded-md w-96 h-96">
                    <h1 className="text-3xl font-bold text-white mt-4">OTP-HERE</h1>
                    <h1 className="text-2xl"> Book-Kart</h1>
                    <h1 className="text-lg font-bold">Otp has sent to your mail</h1>
                    <div className="mt-14">
                        <form className="flex flex-col justify-center items-center" onSubmit={this.submit}>
                            <OtpInput
                                value={this.state.num}
                                onChange={this.handleChange}
                                numInputs={4}
                                separator={<span style={{ width: "8px" }}></span>}
                                isInputNum={true}
                                shouldAutoFocus={true}
                                inputStyle={{
                                    backgroundColor: "transparent",
                                    border: "2px solid gray",
                                    borderRadius: "8px",
                                    width: "54px",
                                    height: "54px",
                                    fontSize: "12px",
                                    color: "#fff",
                                    fontWeight: "400",
                                    caretColor: "blue"
                                }}
                                focusStyle={{
                                    outline: "none"
                                }}
                            />
                            {this.isLoading ? <button className="w-72 h-10 rounded-md text-white mt-5 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 flex justify-center items-center" disabled>
                                <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                    Loading...
                                </button>
                                :<button className="w-72 h-10 rounded-md text-white mt-5 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Login</button>}
                        </form>
                    </div>
                </div>
                {this.alrt === false ? null : <div className="mt-5 p-2 w-72 h-12 flex justify-center items-center border-none rounded-md bg-red-600">
                    <div className="w-full flex justify-between items-center">
                        <p className="text-white">{this.state.err}</p>
                        <button onClick={this.btnClose} ><FontAwesomeIcon icon={faClose} className='cursor-pointer'/></button>
                    </div>
                </div>}
            </div>
        )
    }
}