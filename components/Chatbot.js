
import { RiCloseCircleFill} from "react-icons/ri"
import {SiChatbot} from "react-icons/si"
import React, { useState, useEffect } from 'react';
// import Image from 'next/image'
import config from './chat/config.js';
import MessageParser from './chat/MessageParser';
import ActionProvider from './chat/ActionProvider';
import Chatbot from 'react-chatbot-kit'

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const [messages, setMessages] = useState(props.messageHistory || []);

    // useEffect(() => {
    //   localStorage.setItem("chat_messages", JSON.stringify(messages));
    // }, [messages]);

    // const loadMessages = () => {
    //     const messages = JSON.parse(localStorage.getItem('chat_messages')) || [];
    //     return messages;
    //   };
      
    //   const saveMessages = (messages) => {
    //     localStorage.setItem('chat_messages', JSON.stringify(messages));
    //   };
      
    //   const [messages, setMessages] = useState(loadMessages());   
  

  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
        <div className='fixed right-4 bottom-4 z-20' onClick={handleClick}>
        {isOpen ? <RiCloseCircleFill size={50} /> : <SiChatbot size={50}  />}
      
      </div>
      <div  className={`fixed right-4 bottom-20 z-20 ${isOpen ? '' : 'hidden'}`}>
      <Chatbot 
        config={config}
        // messageHistory={messages}
        // messageHistory={loadMessages()}
        messageParser={MessageParser}
        // saveMessages={saveMessages}
        actionProvider={ActionProvider}
         headerText='Chatbot'
         placeholderText='Input placeholder'
      />
    </div>
    </>
  )
}

export default ChatBot