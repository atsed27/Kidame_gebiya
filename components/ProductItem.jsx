/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

function ProductItem({ product, addToCart }) {
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
          onClick={() => addToCart(product)}
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
