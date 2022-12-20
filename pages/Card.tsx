import { Component } from "react";

export default class BookCard extends Component <{image:string;title:string;desc:string;author:string;genre:string;returnMode:boolean} ,{genre:any;}>{
    constructor(props){
        super(props)
        this.state = {
            genre:[],
        }
    }

    componentDidMount(): void {
        if(this.props.genre !== undefined){
            this.setState({genre:this.props.genre.split(',')});
            console.log(this.state.genre);
        }else{
            this.setState({genre:[]});
        }
    }

    render():React.ReactNode{
        return(
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-white w-[350px] h-[520px]">
                <img className="w-[350px] h-[260px]" src={this.props.image} alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">{this.props.title}</div>
                <div className="font-bold text-xl mb-2">{this.props.author}</div>
                {
                    this.state.genre.map((item: string)=>
                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-800 ml-3">#{item}</span>
                    )
                }
                </div>
                <div className="px-6 pt-4 pb-2">
                    {this.props.returnMode === false ? <button className="bg-gray-600 w-24 h-10 rounded-md hover:bg-gray-800">Take Book</button> : <button className="bg-gray-600 w-24 h-10 rounded-md hover:bg-gray-800">Return Book</button>}
                </div>
            </div>
        )
    }
}