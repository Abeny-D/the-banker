import io from 'socket.io-client'
import {useEffect, useState} from "react";

const socket = io(`http://localhost:4000`)

function TestLobby() {
    // const [socket, setSocket] = useState();

    const [Message, setMessage] = useState("")
    const [MessageReceived, setMessageReceived] = useState("")
    const [room, setRoom] = useState("")

    const joinRoom = () => {
        if (room !== '' ){
            socket.emit('joinRoom', room)
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

    return(
        <div>
            <input placeholder="Lobby ID" onChange={(e) => setRoom(e.target.value)}/>
            <button onClick={joinRoom}>Join lobby</button>

            <input placeholder="Type and send" onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>Send message</button>

            <h2>Message sent from the other side:</h2>
            {MessageReceived}
        </div>
    )
}

export default TestLobby;