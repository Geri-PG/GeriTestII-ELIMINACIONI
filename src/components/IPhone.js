import React from "react";

import classes from "./IPhone.module.css";

const IPhone = ({ thumbnail, title, description, brand }) => {
  return (
    <div className={classes.iphone}>
      <img className={classes.thumbnail} src={thumbnail} alt="Thumbnail" />
      <h2>{title}</h2>
      <h3>{description}</h3>
      <h1>{brand}</h1>
    </div>
  );
};

export default IPhone;
