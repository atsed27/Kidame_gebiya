import { Store } from '@/utils/Store';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

function Layout({ children, title }) {
  const { status, data: session } = useSession();
  const { dispatch, state } = useContext(Store);
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    setCartItemCount(state.cart.cartItem.reduce((a, c) => a + c.quantity, 0));
  }, [state.cart.cartItem]);
  const logOutHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_REST' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>{title ? title + '-kdame-gebya' : 'kdame-gebya'}</title>
      </Head>

      <ToastContainer limit={1} position="bottom-center" />
      <div className="flex flex-col justify-between min-h-screen">
        <header>
          <nav className="flex items-center justify-between h-10 px-4 shadow-xl md:h-15 lg:h-20 shadow-gray-300 ">
            <Link className="text-lg font-bold top " href={'/'}>
              Home
            </Link>
            <div>
              <Link className="p-2 top" href={'/cart'}>
                Cart
                {cartItemCount > 0 && (
                  <span className="px-2 py-1 ml-1 text-sm font-bold text-white bg-red-700 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block ">
                  <Menu.Button className="text-blue-600 top ">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropdownLink href="/profile" className="dropdown-link">
                        profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        href="/order-history"
                        className="dropdown-link"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>

                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logOutHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="p-2 top " href={'/login'}>
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container px-4 m-auto mt-8">{children}</main>
        <footer className="flex justify-center h-10 shadow-inner item-centers">
          <p>Copyright @ 2016 E.C Gebiya</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
