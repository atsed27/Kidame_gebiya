import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

function Layout({ children, title }) {
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
