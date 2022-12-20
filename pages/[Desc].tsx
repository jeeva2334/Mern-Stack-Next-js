import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import React ,{ Component } from 'react';
import Navbar from './navbar';

export default class Description extends Component <{},{books:any}> {
    constructor(props){
        super(props)
        this.state = {
            books : []
        }
    }
    componentDidMount(): void {
        const { Desc } = Router.query;
        axios.get(`http://localhost:8000/api/books/getBook/${Desc}`).then(res=>{
            console.log(res.data.Book);
            this.setState({books:res.data.Book})
        })
    }
    takeBook(){
        const { Desc } = Router.query;
        const id = localStorage.getItem('userid');
        const body = {
            bookId: Desc,
            userId: id
        }
        console.log(body);
        axios.post(`http://localhost:8000/api/myBooks/takeBook/`,body).then(res=>{
            console.log(res);
            Router.push('/Timer');
        }).catch(e=>{
            console.log(e.response.data);
        })
    }
    Alert(){
        alert("Book has been taken")
    }
    render() {
        return (
            <div className='h-screen'>
                <Head>
                    <title>Bookkart-{`${this.state.books.title}`}</title>
                </Head>
                <Navbar />
                <div className=' h-full flex flex-col'>
                    <div className='container mt-16 flex flex-col justify-center items-center'>
                        <h1 className='mt-6 font-extrabold text-3xl'>{this.state.books.title}</h1>
                        <div className='h-full flex flex-col justify-center items-center'>
                            <div className='w-48 h-52 mt-58 md:mt-16'>
                                <img src={this.state.books.image} alt={this.state.books.title} className="ronded-xl"/>
                            </div>
                            <div className='mt-20 w-full flex justify-center items-center p-6'>
                                <p className=''><span className='font-bold text-xl mb-2'>Descpription : </span><br />{this.state.books.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-20 justify-center items-end'>
                        <div className='mr-14 flex flex-col justify-center items-center'>
                            <h1 className='font-bold'>Peaked Your Intrest ?</h1>
                            {this.state.books.isTaken === false ? <button className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 mt-3 mb-1" onClick={this.takeBook}>Take-And-Read</button>
                            :<button className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 mt-3 mb-1" onClick={this.Alert}>Book Has Been Taken</button>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
