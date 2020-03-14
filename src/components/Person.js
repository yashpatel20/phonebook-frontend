import React from "react";

const Person = props => {
  return (
    <div>
      <span>
        {props.name} {props.number}
      </span>
      <span>
        <button
          value={props.name}
          onClick={props.handleDelete}
          style={{ color: "blue" }}
        >
          delete
        </button>
      </span>
    </div>
  );
};

export default Person;
