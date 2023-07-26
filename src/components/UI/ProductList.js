import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteProduct } from "./store/productsSlice";

function ProductList() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.id);
        dispatch(deleteProduct(id));
      });
  };

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "200px" }}
          />
          <Link to={`/product/${product.id}`}>View Details</Link>
          <button
            onClick={() => {
              navigate(`/product/edit/${product.id}`);
            }}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
      <Link to="/product/add">Add New Product</Link>
    </div>
  );
}

export default ProductList;
