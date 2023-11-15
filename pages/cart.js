import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    cart: { cartItem },
  } = state;
  const removeHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, num) => {
    const quantity = Number(num);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('sorry product is out of stack');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('product update is successfully');
  };

  return (
    <Layout title={'shopping Cart'}>
      <h1 className="mb-4 text-xl">Shopping cart</h1>
      {cartItem.length === 0 ? (
        <div>
          cart is empty .<Link href={'/'}>Go to shopping</Link>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-4 md:gap-5">
          <div className="md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItem.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        className="flex items-center"
                        href={`/product/${item.slug}`}
                      >
                        <Image
                          src={item.image}
                          alt={item.image}
                          width={50}
                          height={50}
                        />
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        className="bg-white"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeHandler(item)}>x</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/*  right grid*/}
          <div className="p-5 card">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  SubTotal ({cartItem.reduce((a, c) => a + c.quantity, 0)}) : $({' '}
                  {cartItem.reduce((a, c) => a + c.quantity * c.price, 0)})
                </div>
              </li>
              <li>
                <div>
                  <button
                    onClick={() => router.push('login?redirect=/shipping')}
                    className="w-full primary-button"
                  >
                    Check Out
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
