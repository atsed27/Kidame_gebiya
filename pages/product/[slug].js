import Layout from '@/components/Layout';
import Products from '@/model/Product';
import { Store } from '@/utils/Store';
import db from '@/utils/db';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

function ProductDetail(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product)
    return <Layout title="Product not found"> Product is not found</Layout>;

  const addToCart = async () => {
    const existItem = state.cart.cartItem.find((x) => x.name === product.name);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('sorry product is out of stack');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href={'/'}>back to product</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4 md:gap-10">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg"> {product.name} </h1>
            </li>
            <li>Category:{product.category}</li>
            <li>Brand:{product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description:{product.description}</li>
          </ul>
        </div>
        <div>
          <div className="p-5 card">
            <div className="flex justify-between mb-2">
              <div>price</div>
              <div>${product.price}</div>
            </div>
            <div className="flex justify-between my-2">
              <div>status</div>
              <div>{product.countInStock > 0 ? 'InStack' : 'Unavailable'}</div>
            </div>
            <button onClick={addToCart} className="w-full primary-button">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Products.findOne({ slug }).lean();
  console.log(product);
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
