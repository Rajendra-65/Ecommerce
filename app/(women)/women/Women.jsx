import React from 'react'
import ProductComponent from '../../components/ProductComponent';

const Women = ({ category, AllProducts }) => {
    return (
        <div className="flex flex-row h-[100%] w-[100%] flex-wrap items-start">
          {AllProducts.map((product, i) =>
            product.category === category ? (
              <ProductComponent key={product._id} product={product} />
            ) : null
          )}
        </div>
      );
}

export default Women