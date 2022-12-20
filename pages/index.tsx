import * as React from 'react'
import axios from 'axios'
import Router from 'next/router';
import Head from 'next/head';
import image from '../assets/hitler.jpg'
import BookCard from './Card';
import Navbar from './navbar';
import Link from 'next/link';

export default class Home extends React.Component<{}, {navbar:boolean;books:any}> {
  constructor(props){
    super(props)
    this.state = {
      navbar:false,
      books: []
    }
  }

  books = [] ;

  componentDidMount(): void {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userid");
    console.log(id)
    console.log(token);

    if(!token || !id) {
      Router.push('/auth/Login');
    }

    axios.get(`http://localhost:8000/api/books/getBooks/`).then((res)=>{
      console.log(res.data)
      this.books = res.data.books;
      this.setState({books: this.books});
      console.log(this.books);
    }).catch(e=>{console.log(e);alert("Connection Failed")});
  }

  //base64 to image function
  base64ToImage = (base64:string):string => {
    return `data:image/jpeg;base64,${base64}`;
  }

  render(): React.ReactNode {
    return(
      <div className='h-screen'>
        <Head>
          <title>Bookkart-Home</title>
        </Head>
        <Navbar />
        <div className='container h-full flex flex-col'>
          <div className='h-full mt-16 flex flex-col justify-start items-center px-3'>
            <h1 className='text-3xl font-bold mt-3 mb-5'>Book-Kart</h1>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
              {this.state.books ? this.state.books.map(book => {

                return (<Link href={`/${book._id}`}><BookCard returnMode={false} key={book._id} image={book.image} title={book.title} desc={book.description} author={book.author} genre={book.genre} /></Link>)
              }):<p className='h-full flex justify-center items-center font-bold text-2xl'>No Books</p>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
