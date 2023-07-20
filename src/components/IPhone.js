import React from "react";

import classes from "./IPhone.module.css";

const IPhone = (props) => {
  return (
    <li className={classes.iphone}>
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <h1>{props.brand}</h1>
    </li>
  );
};

export default IPhone;
