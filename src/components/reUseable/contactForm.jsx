import React, { Component, useState } from "react";
import { HiMail } from "react-icons/hi";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import "../../styles/contactForm.css";
import http from "../../Services/httpService";
import { toast } from "react-toastify";

const endPoint = "http://localhost:5000/contact";

const ContactForm = () => {
  const [senderName, setsenderName] = useState("");
  const [senderEmail, setsenderEmail] = useState("");
  const [senderSubject, setsenderSubject] = useState("");
  const [SenderMassage, setSenderMassage] = useState("");

  let sendMassage = async (name, email, subject, bodyMassage) => {
    let newMassage = {
      name,
      email,
      subject,
      bodyMassage,
    };
    const { data: massage } = await http.post(endPoint, newMassage);
    toast.success("Massage sent");
    setsenderName("");
    setsenderEmail("");
    setsenderSubject("");
    setSenderMassage("");
  };
  const handleSubmite = (e) => {
    e.preventDefault();
  };
  return (
    <React.Fragment>
      <div className="massages-container">
        <div className="content">
          <div className="left-side">
            <div className="address details">
              <TiLocation fontSize={40} />
              <div className="topic">Address</div>
              <div className="text-one">KSU</div>
              <div className="text-two">Computer collage</div>
            </div>
            <div className="phone details">
              <FaPhoneSquareAlt fontSize={40} />
              <div className="topic">Phone</div>
              <div className="text-one">+9665 5555 5555</div>
              <div className="text-two">+9665 5555 5555</div>
            </div>
            <div className="email details">
              <HiMail fontSize={40} />
              <div className="topic">Email</div>
              <div className="text-one">438101510@student.ksu.esu.sa</div>
              <div className="text-two">438103536@student.ksu.esu.sa</div>
            </div>
          </div>
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p></p>
            <form onClick={handleSubmite}>
              <div className="input-box">
                {/* <input type="text" placeholder="Enter your name"> */}
                <input
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    setsenderName(e.target.value);
                  }}
                  value={senderName}
                />
              </div>
              <div className="input-box">
                {/* <input type="text" placeholder="Enter your email"> */}
                <input
                  type="text"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setsenderEmail(e.target.value);
                  }}
                  value={senderEmail}
                />
              </div>
              <div className="input-box">
                {/* <input type="text" placeholder="Enter your email"> */}
                <input
                  type="text"
                  placeholder="Enter your subject"
                  onChange={(e) => {
                    setsenderSubject(e.target.value);
                  }}
                  value={senderSubject}
                />
              </div>
              <div className="input-box message-box">
                <input
                  type="text"
                  placeholder="Enter your massage"
                  onChange={(e) => {
                    setSenderMassage(e.target.value);
                  }}
                  value={SenderMassage}
                />
              </div>
              <div className="button">
                {/* <input type="button" value="Send Now" > */}
                <button
                  onClick={() =>
                    sendMassage(
                      senderName,
                      senderEmail,
                      senderSubject,
                      SenderMassage
                    )
                  }
                >
                  Send Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactForm;
