import '../cssDirectory/mainPage.css'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import io from 'socket.io-client'
import {useEffect, useState} from "react";

const socket = io(`http://localhost:4000`)


function JoinCreateRoom(){

    const [Message, setMessage] = useState("")
    const [MessageReceived, setMessageReceived] = useState("")
    const [room, setRoom] = useState("")

    const joinRoom = () => {
        if (room !== '' ){
            socket.emit('joinRoom', room)
            console.log(`joinRoom${room}`)
        }
    }

    const sendMessage = () => {
        socket.emit('sendMessage' , {Message , room})

    }

    useEffect(() => {

        socket.emit('resendMessage', (data) => {
            setMessageReceived(data.Message)
        })

        // return () => {
        //     socket.disconnect()
        // }
    }, [])

    return (  <div className="mainPageMainContainer">
            <VolumeUpIcon className="soundButtonHomePage"/>
            <MenuIcon className="reorderButtonHomePage" to='/' />


            <div className="mainPageButtonContainer">
                <input placeholder="Join with Room ID" className= "inputJoinRoom" onChange={(e) => setRoom(e.target.value)}/>
                <button className="buttonJoinRoom" onClick={joinRoom}>Join Room</button>
                <input placeholder="Create Room ID" className= "inputCreateRoom" onChange={(e) => setMessage(e.target.value)}/>
                <button className="buttonCreateRoom" onClick={sendMessage}>Create Room</button>
                <Link to="/" className="buttonHomePageback">Go to home</Link>
                <Link to="/gameFlow" className="buttonHomePageback">Start game</Link>


            </div>
            <div className="footerLinks">
                <InstagramIcon className="footerIcon instagram"/>
                <FacebookIcon className="footerIcon facebook"/>
                <LinkedInIcon className="footerIcon linkden"/>
                <XIcon className="footerIcon x"/>

            </div>
    </div>

    )

}

export default JoinCreateRoom;