import React, { useState } from "react";
import styles from "./Contact.module.scss"; 
const Contact = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState(""); 
  const [Message, setMessage] = useState("")  
  const submitHandler = (e: React.SyntheticEvent) =>{ 
    e.preventDefault();

    // return default state 
    setName("");
    setEmail(""); 
    setMessage(""); 
  }

  return (
    <div className={styles["contact-form"]} >
      <form onSubmit={submitHandler}>
        <h2>CONTACT US</h2>
    
        <input type="text" placeholder="Name" value={Name} required/>
  
        <input type="email" placeholder="Email" value={Email} required/>

        <input type="text" placeholder="Message" value={Message} required/>

        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default Contact;
