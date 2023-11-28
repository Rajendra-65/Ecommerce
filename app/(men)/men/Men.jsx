import React from "react";
import ProductComponent from "../../components/ProductComponent";
const Men = ({ category, AllProducts }) => {
  return (
    <div className="flex flex-row h-[100%] w-[100%]">
      {AllProducts.map((product, i) =>
        product.category === category ? (
          <ProductComponent key={product._id} product={product} />
        ) : null
      )}
    </div>
  );
};

export default Men;
