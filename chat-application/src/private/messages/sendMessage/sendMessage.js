import React, { useState } from "react";
import Header from "../../../components/header/header.js";
import Footer from "../../../components/footer/footer.js";
import { useLocation } from "react-router-dom";
import "./style.css";

function SendMessage() {
  const { state: { user } = {} } = useLocation();
  const [messageContent, setMessageContent] = useState("");

  const handleMessageChange = (e) => {
    setMessageContent(e.target.value);
  };

  const handleSendMessage = () => {
    console.log("User Data:", user);
    console.log("Message:", messageContent);
  };

  return (
    <>
      <Header />
      <div className="message-container">
        <div className="message-header">
          <h2>Send Message</h2>
          {user && (
            <label className="recipient-label">
              To: {user.first_name} {user.last_name}
            </label>
          )}
        </div>
        <div className="message-form">
          <div className="form-group">
            <label htmlFor="messageContent">Message:</label>
            <textarea
              id="messageContent"
              value={messageContent}
              onChange={handleMessageChange}
              rows="5"
              className="message-input"
              placeholder="Write your message here"
            />
          </div>
          <button onClick={handleSendMessage} className="send-button">
            Send Message
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SendMessage;

