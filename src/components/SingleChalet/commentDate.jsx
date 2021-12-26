import React, { Component } from "react";

const CommentDate = ({ dateOfTheComment, dateAsString }) => {
  //   let date = dateOfTheComment(dateAsString);
  //   console.log(typeof dateAsString);

  let commentdate = new Date(dateAsString);

  return <p>{commentdate.toLocaleString()}</p>;
};

export default CommentDate;
