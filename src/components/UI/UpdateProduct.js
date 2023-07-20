import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePhone } from "../store/PhonesSlice";

function UpdateProduct({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const updateProductHandler = () => {
    dispatch(updatePhone(updatedProduct));
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={updatedProduct.title}
        onChange={inputChangeHandler}
      />
      <input
        type="text"
        name="description"
        value={updatedProduct.description}
        onChange={inputChangeHandler}
      />
      <input
        type="text"
        name="brand"
        value={updatedProduct.brand}
        onChange={inputChangeHandler}
      />
      <button onClick={updateProductHandler}>Update Product</button>
    </div>
  );
}

export default UpdateProduct;
