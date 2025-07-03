import io from 'socket.io-client'
import {useEffect, useState} from "react";


const socket = io(`http://localhost:4000`)

function TestServerSend() {

    const [newMessage, setNewMessage] = useState("")
    const [newMessageReceived, setNewMessageReceived] = useState("")



    let sendMessage = () => {
        socket.emit("change_message", {newMessage});
    }

    useEffect(() => {
        socket.on("resend_message", (data) => {
            setNewMessageReceived(data.newMessage)
        })
    }, [socket]);
    return(
        <div>
            <button onClick={sendMessage} >Send message</button>
            <input placeholder="type and send" onChange={(e) => setNewMessage(e.target.value)}/>
            <h1>this will be the text :</h1>
            {newMessageReceived}
        </div>
    )
}

export default TestServerSend;