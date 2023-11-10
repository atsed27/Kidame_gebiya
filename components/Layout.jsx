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
          <nav className="flex justify-between px-4 h-10 md:h-15 lg:h-20 shadow-xl shadow-gray-300 items-center ">
            <Link className=" font-bold text-lg" href={'/'}>
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
        <main className="container m-auto mt-8  px-4">{children}</main>
        <footer className="flex h-10 shadow-inner  item-centers justify-center">
          <p>Copyright @ 2016 E.C Gebiya</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
