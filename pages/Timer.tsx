import Image from 'next/image';
import Router from 'next/router';
import React,{Component} from 'react';
import door from '../assets/Door.gif'

export default class Timer extends Component {
    componentDidMount(){
        this.timer();
    }
    timer(){
        const timer = setTimeout(() => {
            Router.push('/');
        }, 21000);
    }
    render():React.ReactNode {
        return (
            <div className='h-screen flex flex-col justify-center items-center'>
                <Image className='w-[400px] h-[400px]' src={door} alt="" />
                <p className='text-xl font-bold text-center'>Door will be Opened for 20 Seconds<br />Close the Door Safely after taking the Book<br />( Dont close the page )</p>
            </div>
        )
    }
}