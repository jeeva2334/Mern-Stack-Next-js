import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React, { Component } from 'react';
import BookCard from './Card';
import Navbar from './navbar';

export default class MyBooks extends Component<{},{book:any;fullData:any;cartId:any}> {
    constructor(props){
        super(props);
        this.state = {
            book: [],
            fullData: [],
            cartId: []
        }
        this.bookFetch = this.bookFetch.bind(this);
    }
    componentDidMount(): void {
        const id = localStorage.getItem('userid');
        const body = {
            userId: id
        }
        if(id === null){
            Router.push('/auth/Login');
        }
        axios.post(`http://localhost:8000/api/myBooks/`,body).then((res)=>{
            let data = [...res.data];
            this.setState({book:data});
            this.bookFetch();
        }).catch(e=>{
            console.log(e);
        })
    }

    bookFetch(){
        for (let index = 0; index < this.state.book.length; index++) {
            var element = this.state.book[index].bookId;
            axios.get(`http://localhost:8000/api/books/getBook/${element}`).then(res=>{
                console.log(res.data)
                this.setState({fullData:[...this.state.fullData,res.data]})
                this.setState({cartId:[...this.state.cartId,this.state.book[index]._id]})
            })
        }
    }
    render(): React.ReactNode {
        return (
            <div className='h-screen'>
                <Head>
                    <title>Bookkart-MyBooks</title>
                </Head>
                <Navbar />
                <div className='container h-full flex flex-col'>
                    <div className='h-full mt-16 flex flex-col justify-start items-center px-3'>
                        <button className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 mt-3 mb-1" onClick={this.bookFetch}>Get my Books</button>
                        <h1 className='text-3xl font-bold mt-3 mb-5'>Book-Kart</h1>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
                            {this.state.fullData ? this.state.fullData.map((book:any,index:number = 0) => { 
                                <Link href={`/Return/${this.state.cartId[index]}`}><BookCard key={book.Book._id} returnMode={true} image={book.Book.image} title={book.Book.title} desc={book.Book.description} author={book.Book.author} genre={book.Book.genre} /></Link>
                            }):<div className='h-full text-2xl font-bold flex justify-center items-center'><h1>Hello</h1></div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
