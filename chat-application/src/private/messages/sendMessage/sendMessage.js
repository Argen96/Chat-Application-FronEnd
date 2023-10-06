import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/header/header.js";
import Footer from "../../../components/footer/footer.js";
import "./style.css";
import io from "socket.io-client";

let socket;

function SendMessage() {
  const chatHistoryRef = useRef();
  const messageInputRef = useRef(); 
  const { state: { recipientUser } = {} } = useLocation();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const token = localStorage.getItem("access_token");

  const formatTimestamp = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    const formatDatePart = (part) => part.toString().padStart(2, "0");
    const formattedDate = `${formatDatePart(date.getMonth() + 1)}/${formatDatePart(
      date.getDate()
    )}/${date.getFullYear()}`;
    const formattedTime = `${formatDatePart(date.getHours())}:${formatDatePart(
      date.getMinutes()
    )}:${formatDatePart(date.getSeconds())}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const handleNewMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      const newMessage = {
        message_content: messageInput,
        sender_id: currentUserId,
        recipient_id: recipientUser.id,
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("chat message", newMessage);
      setMessageInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSendMessage();
    }
  };

  useEffect(() => {
    socket = io.connect("http://localhost:80");
    if (socket) {
      socket.on("connect", () => {
        socket.emit("authenticate", currentUserId);

        socket.on("chat message", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
          chatHistoryRef.current.scrollTop =
            chatHistoryRef.current.scrollHeight;
        });
      });

      return () => {
        socket.disconnect();
        console.log("WebSocket connection closed");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (token && recipientUser) {
      axios
        .get("http://localhost:80/api/user/current-user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user_id = response.data.user_id;
          setCurrentUserId(user_id);

          axios
            .get(
              `http://localhost:80/api/chat/messages/${user_id}/${
                recipientUser?.id || ""
              }`,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              const receivedMessages = response.data;
              setMessages(receivedMessages);
              chatHistoryRef.current.scrollTop =
                chatHistoryRef.current.scrollHeight;
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

  useEffect(() => {
    chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <Header />
      <div className="chat-container">
        <div className="chat-header">
          <h2>
            Chat with{" "}
            {recipientUser
              ? `${recipientUser.first_name} ${
                  recipientUser.last_name || ""
                }`
              : "No user selected"}
          </h2>
        </div>
        <div className="chat-history" ref={chatHistoryRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender_id === currentUserId ? "sent" : "received"
              }`}
            >
              <div className="message-sender">
                {message.sender_id === currentUserId ? "You" : recipientUser?.first_name}
              </div>
              <div className="message-text">{message.message_content}</div>
              <div className="message-timestamp">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          ))}
        </div>
        <div className="message-input">
          <textarea
            ref={messageInputRef}
            placeholder="Type your message..."
            value={messageInput}
            onChange={handleNewMessageChange}
            onKeyDown={handleKeyDown} 
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SendMessage;
