import React, { useState } from "react";
import styles from "./Contact.module.scss";
const Contact = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  const nameChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const emailChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const messageChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // return default state
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={styles["contact-form"]}>
      <form onSubmit={submitHandler}>
        <h2>CONTACT US</h2>

        <input
          type="text"
          placeholder="Name"
          value={Name}
          onChange={nameChangeHandler}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={emailChangeHandler}
          required
        />

        <textarea
          placeholder="Message"
          value={Message}
          onChange={messageChangeHandler}
          rows={5}
          maxLength={200}
        ></textarea>

        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default Contact;
