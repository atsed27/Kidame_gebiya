import { Store } from '@/utils/Store';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';

function Layout({ children, title }) {
  const { state } = useContext(Store);
  return (
    <>
      <Head>
        <title>{title ? title + '-kdame-gebya' : 'kdame-gebya'}</title>
      </Head>
      <div className="flex flex-col justify-between min-h-screen">
        <header>
          <nav className="flex items-center justify-between h-10 px-4 shadow-xl md:h-15 lg:h-20 shadow-gray-300 ">
            <Link className="text-lg font-bold " href={'/'}>
              Home
            </Link>
            <div>
              <Link className="p-2" href={'/cart'}>
                Cart
                {state.cart.cartItem.length > 0 && (
                  <span className="px-2 py-1 ml-1 text-sm font-bold text-white bg-red-700 rounded-full">
                    {state.cart.cartItem.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
              <Link className="p-2" href={'/login'}>
                Login
              </Link>
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
