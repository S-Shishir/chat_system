import React, { useState, useEffect } from 'react';
import styles from "./Chat.module.css";

const Chat = ({ socket }) => {
    const [sentMessage, setSentMessage] = useState("");
    const [recievedMessage, setRecievedMessage] = useState([]);

    const sendMessage = async () => {
        if(sentMessage){
            await socket.emit('send-message', sentMessage);
            setRecievedMessage((prevMessages) => [...prevMessages, sentMessage]);
            setSentMessage("");
        }
    };

    useEffect(() => {
        const handleReceiveMessage = (newMessage) => {
            setRecievedMessage((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on("recieve-message", handleReceiveMessage);

        return () => {
            socket.off("recieve-message", handleReceiveMessage);
        };
    }, [socket]);

    return(
        <>
            <h1 style={{ color: 'darkmagenta' }}>
                Welcome to Real-time Chat System!
            </h1>
            <div className={styles.chatBody}>
                {recievedMessage.map((message) => {
                    return(
                        <div>
                            {message}
                        </div>
                    )
                })}
            </div>
            <div className={styles.input}>
                <input type='text' 
                    onChange={(e) => {setSentMessage(e.target.value)}} 
                    onKeyPress={(e) => {
                        e.key === 'Enter' && sendMessage();
                    }}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
    );
};

export default Chat;