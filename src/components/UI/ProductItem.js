import IPhone from "../IPhone";
import DeleteProduct from "./DeleteProduct";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="product-wrapper" key={product.id}>
      <IPhone
        thumbnail={product.thumbnail}
        title={product.title}
        description={product.description}
        brand={product.brand}
      />
      <footer className="actions">
        <button
          onClick={() => {
            navigate(`/product/${product.id}`);
          }}
        >
          View Details
        </button>
        <button
          onClick={() => {
            navigate(`/product/edit/${product.id}`);
          }}
        >
          Edit
        </button>
        <DeleteProduct productId={product.id} />
      </footer>
    </div>
  );
};

export default ProductItem;
