import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import nookies from "nookies"; // Import nookies for cookie handling

type Props = {
  children?: ReactNode;
  title?: string;
  token?: string | null;
  isUser?: boolean;
  isVenue?: boolean;
  userId?: number;
  venueId?: number;
};

const Layout = ({ children, title = "This is the Layout", token, isUser, isVenue }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove token from cookies on logout
    nookies.destroy(null, "token", { path: "/" }); // Destroy cookie
    setIsLoggedIn(false); // Update login state
    router.push("/login"); // Redirect to login page
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <button
              onClick={toggleMenu}
              type="button"
              className="lg:hidden md:hidden sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Cooked4U
            </span>
            <div className="hidden sm:block sm:ml-6 flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get started
                </Link>
              )}
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                {isLoggedIn && (
                  <li>
                    <Link
                      href={
                        isVenue
                          ? "/venueDashboard"
                          : isUser
                          ? "/dashboard"
                          : "/"
                      }
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="sm:hidden" id="mobile-menu">
            {/* Mobile Menu */}
            <div
              className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}
              id="mobile-menu"
            >
              <ul className="flex flex-col items-start p-4 space-y-2 bg-gray-50 rounded-md dark:bg-gray-800">
                <li>
                  <Link href="/" className="text-gray-900 dark:text-white">
                    Home
                  </Link>
                </li>
                {isLoggedIn && (
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-gray-900 dark:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-900 dark:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-900 dark:text-white">
                    About
                  </Link>
                </li>
                {isLoggedIn ? (
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu(); // Close the menu after logout
                      }}
                      className="text-red-600 dark:text-red-400"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="text-blue-700 dark:text-blue-400"
                    >
                      Get started
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="pt-2 pb-16">{children}</main> {/* Add padding bottom */}
      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Meal app™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Layout;
