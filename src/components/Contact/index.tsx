import React from "react";
import { useCheckAuth } from "../../hooks/useCheckAuth";

const Contact = () => {
  useCheckAuth();
  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
};

export default Contact;
