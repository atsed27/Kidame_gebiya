/* eslint-disable @next/next/no-img-element */
import { Store } from '@/utils/Store';
import Link from 'next/link';
import React, { useContext } from 'react';

function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);
  const addToCart = (product) => {
    const existItem = state.cart.cartItem.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('sorry out of stack');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <div className="card">
      <Link href={`product/${product.slug}`}>
        <img
          className="rounded shadow"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="">${product.price}</p>
        <button
          onClick={() => {
            addToCart(product);
          }}
          className="primary-button"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
