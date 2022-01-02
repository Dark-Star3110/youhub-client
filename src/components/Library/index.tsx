import React from "react";
import { useCheckAuth } from "../../hooks/useCheckAuth";

const Library = () => {
  useCheckAuth();
  return (
    <div>
      <h1>Library</h1>
    </div>
  );
};

export default Library;
