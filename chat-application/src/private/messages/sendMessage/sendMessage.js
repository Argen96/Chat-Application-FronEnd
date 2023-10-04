import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/header/header.js";
import Footer from "../../../components/footer/footer.js";
import "./style.css";

function SendMessage() {
  const [messages, setMessages] = useState([]); 
  const chatHistoryRef = useRef()
  const [newMessage, setNewMessage] = useState('');
  const { state: { recipientUser } = {} } = useLocation();
  const [currentUserId, setCurrentUserId] = useState(""); 
  const token = localStorage.getItem("access_token");
  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const formatTimestamp = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    const formatDatePart = (part) => part.toString().padStart(2, '0');
    const formattedDate = `${formatDatePart(date.getMonth() + 1)}/${formatDatePart(date.getDate())}/${date.getFullYear()}`;
    const formattedTime = `${formatDatePart(date.getHours())}:${formatDatePart(date.getMinutes())}:${formatDatePart(date.getSeconds())}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && recipientUser) {
      const message = {
        text: newMessage,
        recipient_id: recipientUser?.id || null,
      };

      axios.post("http://localhost:80/api/chat/send", message, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setNewMessage('');
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (token && recipientUser) {
      axios.get("http://localhost:80/api/user/current-user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const user_id = response.data.user_id;
          setCurrentUserId(user_id);

          axios.get(`http://localhost:80/api/chat/messages/${user_id}/${recipientUser?.id || ''}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              const receivedMessages = response.data;
              setMessages(receivedMessages); 
              chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token, recipientUser]);

  return (
    <>
      <Header />
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat with {recipientUser ? `${recipientUser.first_name} ${recipientUser.last_name || ''}` : "No user selected"}</h2>
        </div>
        <div className="chat-history" ref={chatHistoryRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender_id === currentUserId ? 'sent' : 'received'}`}>
              <div className="message-sender">{message.sender_id === currentUserId ? 'You' : recipientUser?.first_name}</div>
              <div className="message-text">{message.message_content}</div> {/* Make sure message_content matches the database column name */}
              <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
            </div>
          ))}
        </div>
        <div className="message-input">
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={handleNewMessageChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SendMessage;
