import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { Component } from "react";

export default class AddBook extends Component<{},{title:string;author:string;description:string;image:string;err:string;adminMail:string;genre:string}>{

    constructor(props){
        super(props)
        this.state = {
            title:"",
            author:"",
            description:"",
            image:"",
            err:'',
            adminMail:'',
            genre:''
        }
        this.Submit = this.Submit.bind(this);
    }

    isAdmin:boolean = false;

    // componentDidMount(): void {
    //     if(localStorage.getItem('token') === null){
    //         Router.push('/auth/Login');
    //     }else{
    //         const id = localStorage.getItem('userid');
    //         console.log(id);
    //         const body = {
    //             id:id
    //         }
    //         axios.get(`http://localhost:8000/api/user/profile/${id}`).then((res)=>{
    //             console.log(res.data);
    //             if(res.data.user.email === 'jeeva.v910@gmail.com'){
    //                 this.isAdmin = true;
    //                 this.setState({adminMail:res.data.user.email});
    //             }else{
    //                 Router.push('/auth/Login');
    //             }
    //         }).catch((err)=>{
    //             console.log(err);
    //         })
    //     }
    // }

    show:boolean = false;

    btnClose = () => {
        this.show = false;
        this.setState({err:''});
    }


    //convert image to base64 function
    convertImageToBase64 = (image:File):Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.onload = () => {
                resolve(fileReader.result as string);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    //passing image file in function
    handleImageChange = async (event:React.ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files[0];
        const base64Image = await this.convertImageToBase64(image);
        console.log(base64Image);
        this.setState({image:base64Image});
    };

    async Submit(e){
        e.preventDefault();
        try {
            if(this.state.title === '' || this.state.author === '' || this.state.description === '' || this.state.image === ''){
                this.setState({err:"All Fields are Required"});
                this.show = true;
            }else{
                console.log(this.state)
                const body = {
                    title:this.state.title,
                    author:this.state.author,
                    description:this.state.description,
                    image:this.state.image,
                    genre:this.state.genre
                }
                const res = await axios.post("http://localhost:8000/api/books/addBook/",body);
                console.log(res.data)
                this.setState({title:'',author:'',description:'',image:'',genre:''});
            }
        } catch (error) {
            console.log(error)
        }
    }



    render():React.ReactNode{
        return(
            <div className="h-screen flex flex-col justify-center items-center">
                <Head>
                    <title>Bookkart-AddBooks</title>
                </Head>
                <h1 className="text-4xl mb-6 font-bold">Add Books</h1>
                <form className="flex flex-col" onSubmit={this.Submit}>
                    <label htmlFor="title" className="mb-3 text-xl font-bold">Title:</label>
                    <input type="text" name="title" className="w-[290px] h-8 bg-transparent border-2 rounded-md p-4 focus:outline-none focus:shadow-xl" placeholder="title" onChange={e=>{this.setState({title:e.target.value})}} />
                    <label htmlFor="author" className="mb-3 text-xl font-bold">Author:</label>
                    <input type="text" name="Author" className="w-[290px] h-8 bg-transparent border-2 rounded-md p-4 focus:outline-none focus:shadow-xl" placeholder="Author" onChange={e=>{this.setState({author:e.target.value})}}/>
                    <label htmlFor="description" className="mb-3 text-xl font-bold">Description:</label>
                    <input type="text" name="description" className="w-[290px] h-8 bg-transparent border-2 rounded-md p-4 focus:outline-none focus:shadow-xl" placeholder="Description" onChange={e=>{this.setState({description:e.target.value})}} />
                    <label htmlFor="description" className="mb-1 text-xl font-bold">Genre:</label>
                    <p className="text-white text-sm font-medium mb-3">( Seprate genre with comma )</p>
                    <input type="text" name="genre" className="w-[290px] h-8 bg-transparent border-2 rounded-md p-4 focus:outline-none focus:shadow-xl" placeholder="Description" onChange={e=>{this.setState({genre:e.target.value})}} />
                    <label htmlFor="Cover" className="mb-3 text-xl font-bold">Cover:</label>
                    <input type="file" name="image" className="w-[290px] h-full bg-transparent border-2 rounded-md p-4 focus:outline-none focus:shadow-xl" placeholder="Image" onChange={this.handleImageChange}/>
                    <button className="w-[290px] h-9 bg-gray-500 hover:bg-gray-600 p-3 rounded flex justify-center items-center mt-4">Add Book</button>
                </form>
                <div>Go Back to <Link href='/' className="text-blue-800">Home</Link></div>
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