import React from "react";

//this is rendered in entries>Entry; it prints a list of people
const Persons = ({ authors }) => {
  return authors.map((author, index) => (
    <span key={author.lastName + index}>
      {author.firstName} {author.lastName}.{" "}
    </span>
  ));
};

export default Persons;
