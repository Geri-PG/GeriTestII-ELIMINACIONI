import React from "react";
import { useDispatch } from "react-redux";
import { deletePhone } from "../store/PhonesSlice";

function DeleteProduct({ productId }) {
  const dispatch = useDispatch();

  const deleteProductHandler = () => {
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.id);
        dispatch(deletePhone(productId));
      })
      .catch((error) => console.log("An error occurred", error));
  };

  return <button onClick={deleteProductHandler}>Delete</button>;
}

export default DeleteProduct;
