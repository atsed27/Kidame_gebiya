import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import Products from '@/model/Product';
import { Store } from '@/utils/Store';
import db from '@/utils/db';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { data: session } = useSession();
  console.log(session);
  const addToCart = async (product) => {
    const existItem = cart.cartItem.find((x) => x.name === product.name);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('sorry product is out of stack');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('product is add to cart');
  };
  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            addToCart={addToCart}
            product={product}
            key={product.slug}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Products.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
