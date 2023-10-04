import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/header.js";
import Footer from "../../../components/footer/footer.js";
import "./style.css";

function ShowAllChats() {
  const [chatHistory, setChatHistory] = useState([]);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate()

  const formatTimestamp = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    const formatDatePart = (part) => part.toString().padStart(2, '0');
    const formattedDate = `${formatDatePart(date.getMonth() + 1)}/${formatDatePart(date.getDate())}/${date.getFullYear()}`;
    const formattedTime = `${formatDatePart(date.getHours())}:${formatDatePart(date.getMinutes())}:${formatDatePart(date.getSeconds())}`;
    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:80/api/chat-history", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setChatHistory(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  const clickOnProfile = (event) => {
    event.preventDefault()
    const userId = event.currentTarget.getAttribute("data-user-id");
    const firstName = event.currentTarget.getAttribute("data-first-name");
    const lastName = event.currentTarget.getAttribute("data-last-name");

    const userData = {
      id: userId,
      first_name: firstName,
      last_name: lastName,
    };

    navigate(`/send-message/${userId}`, { state: { recipientUser: userData } });
  };
  return (
    <div className="wrapper">
      <Header />
      <div className="chat-list">
        {chatHistory.map((chat) => (
          <div key={chat.message_id}
           className="chat-item"
           onClick={clickOnProfile}
           data-user-id={chat.recipient_id}
           data-first-name={chat.recipient_name}
           >
            <div className="user-info">
              <h3 className="user-name">{`${chat.recipient_name}`}</h3>
              <p className="messages">{chat.message_content}</p>
            </div>
            <p className="timestamp">{formatTimestamp(chat.timestamp)}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ShowAllChats;
