import axios from "axios";
import Link from "next/link";
import Router  from "next/router";
import { Component } from "react";

export default class Navbar extends Component<{},{navbar:boolean;userName:string}>{
    constructor(props){
        super(props)
        this.state = {
            navbar:false,
            userName:''
        }
    }

    componentDidMount(): void {
        const id = localStorage.getItem('userid');
        if(id === null){
            Router.push('/auth/Login');
        }
        axios.get(`http://localhost:8000/api/user/profile/${id}`).then((res)=>{
            console.log(res.data.user.fullname);
            this.setState({userName:res.data.user.fullname})
        }).catch(e=>{
            console.log(e);
        })
            
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        Router.push('/auth/Login');
    }

    render():React.ReactNode{
        return(
            <nav className="w-full bg-black shadow-lg fixed top-0">
              <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                  <div>
                      <div className="flex items-center justify-between py-3 md:py-5 md:block">
                          <Link href="/">
                              <h2 className="text-2xl font-bold text-white">Book-Kart</h2>
                          </Link>
                          <div className="md:hidden">
                              <button
                                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                  onClick={() => this.setState({navbar: !this.state.navbar})}
                              >
                                  {this.state.navbar ? (
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-6 h-6 text-white"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                      >
                                          <path
                                              fillRule="evenodd"
                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                          />
                                      </svg>
                                  ) : (
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-6 h-6 text-white"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                      >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M4 6h16M4 12h16M4 18h16"
                                          />
                                      </svg>
                                  )}
                              </button>
                          </div>
                      </div>
                  </div>
                  <div>
                      <div
                          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            this.state.navbar ? "block" : "hidden"
                          }`}
                      >
                          <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                              <li className="text-white hover:text-indigo-200">
                                  <Link href="/">Home</Link>
                              </li>
                              <li className="text-white hover:text-indigo-200">
                                  <Link href="/MyBooks">My-Books</Link>
                              </li>
                              <li className="text-white hover:text-indigo-200">
                                  <Link href="/About">About US</Link>
                              </li>
                          </ul>

                          <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                          <button
                            className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                            onClick={()=>this.logout()}
                          >
                            Logout from {this.state.userName}
                          </button>
                  </div>
                      </div>
                  </div>
                  <div className="hidden space-x-2 md:inline-block">
                      <button
                          className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-500"
                          onClick={()=>this.logout()}
                      >
                          Logout from {this.state.userName}
                      </button>
                  </div>
              </div>
          </nav>
        )
    }
}