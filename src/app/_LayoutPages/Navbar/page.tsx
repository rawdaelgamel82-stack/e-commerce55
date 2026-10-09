"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../assets/logoo.jpg";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "@/context/cartContext";
import { FaCartShopping } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { getCategories } from "@/app/services/Category.sevice";

interface Category {
  _id: string;
  name: string;
}
export default function Navbar() {
  const { data: session, status } = useSession();
  const { cartNumber } = useContext(cartContext);
  const [categories, setCategories] = useState<Category[]>([]);
  async function fetchNavCategories() {
    try {
      const data = await getCategories();
      if (data && data.data) {
        setCategories(data.data);
      }
    } catch (error) {
      throw new Error("Failed ");
    }
  }
  useEffect(() => {
    fetchNavCategories();
  }, []);
  function LogOut() {
    signOut({
      callbackUrl: "/Login",
    });
  }
  return (
    <>
      <header className="w-full bg-white">
        <div className="hidden items-center justify-center gap-2 border-b border-slate-100 bg-slate-50 py-2 sm:flex">
          <svg
            className="h-3.5 w-3.5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-3.04 8.13-7.21 9.51-.32.1-.66.1-.98 0C8.64 20.13 5.6 16.556 5.6 12V6.317a1 1 0 01.629-.928l5.4-2.16a1 1 0 01.742 0l5.4 2.16a1 1 0 01.629.928V12z"
            />
          </svg>
          <p className="text-xs font-medium text-slate-600">
            FDIC insured up to $250,000 · Bank-level 256-bit encryption
          </p>
        </div>
        <nav className="border-b border-slate-200" aria-label="Main navigation">
          <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a
              href="#"
              className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg"
            >
              <Image src={logo} alt=".." width={170} />
            </a>
            <ul className="hidden items-center gap-1 lg:flex">
              <li>
                <Link
                  href={"/"}
                  aria-current="page"
                  className="rounded-lg px-3.5 py-2 text-sm font-semibold text-green-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/Brands"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href={"/Products"}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Products
                </Link>
              </li>

              <li className="relative group">
                <Link
                  href={"/Categories"}
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  Categories
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <div className="absolute left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 hidden group-hover:block z-50">
                  <Link
                    href="/Categories"
                    className="block px-4 py-2 text-sm font-semibold text-green-700 hover:bg-slate-50"
                  >
                    All Categories
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/Categories/${cat._id}`}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 line-clamp-1"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </li>
              <li>
                <Link
                  href={"/cart"}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <button
                    type="button"
                    className="relative text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm p-3 focus:outline-none"
                  >
                    <FaCartShopping className="text-green-700 text-2xl" />

                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                    />

                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-red-700 bg-danger border-2 border-buffer rounded-full -top-2 -end-2">
                      {cartNumber}
                    </div>
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  href={"/Wishlist"}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <CiHeart className=" text-2xl" />
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-3">
              {session && (
                <Link
                  href={"/"}
                  onClick={LogOut}
                  className="hidden rounded-lg px-3.5 py-2 text-sm font-semibold  bg-green-700  text-white transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 sm:inline-flex"
                >
                  Log Out
                </Link>
              )}
              {!session && (
                <>
                  <Link
                    href={"/Login"}
                    className="hidden rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 sm:inline-flex"
                  >
                    Log In
                  </Link>
                  <Link
                    href={"Register"}
                    className="hidden items-center justify-center rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-700/20 transition-all duration-200 hover:bg-green-800 hover:shadow-md hover:shadow-blue-700/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 sm:inline-flex"
                  >
                    Register Now
                  </Link>
                </>
              )}

              <input
                type="checkbox"
                id="fin-nav-toggle"
                className="peer hidden"
              />
              <label
                htmlFor="fin-nav-toggle"
                className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors duration-200 hover:bg-slate-50 focus-within:ring-2 focus-within:ring-green-600 lg:hidden"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-5 w-5 peer-checked:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <label
                htmlFor="fin-nav-toggle"
                className="fixed inset-0 z-40 hidden bg-slate-900/40 backdrop-blur-sm peer-checked:block lg:hidden"
              />
              <div className="pointer-events-none fixed inset-y-0 right-0 z-50 w-full max-w-xs translate-x-full transform border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out peer-checked:pointer-events-auto peer-checked:translate-x-0 lg:hidden">
                <div className="flex h-[4.5rem] items-center justify-between border-b border-slate-200 px-5">
                  <Image src={logo} alt=".." width={170} />
                  <label
                    htmlFor="fin-nav-toggle"
                    className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-700"
                    aria-label="Close menu"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </label>
                </div>
                <nav
                  className="flex flex-col gap-1 p-4"
                  aria-label="Mobile navigation"
                >
                  <Link
                    href={"/"}
                    aria-current="page"
                    className="rounded-xl bg-green-50 px-4 py-3.5 text-base font-semibold text-green-700"
                  >
                    Home
                  </Link>
                  <Link
                    href={"/Products"}
                    className="rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                  >
                    Products
                  </Link>
                  <Link
                    href={"/Brands"}
                    className="rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                  >
                    Brands
                  </Link>
                  <Link
                    href="#"
                    className="rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                  >
                    Products
                  </Link>
                  <Link
                    href={"/Categories"}
                    className="rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                  >
                    Categories
                  </Link>
                  <Link
                    href={"/cart"}
                    className="rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                  >
                    {cartNumber}
                  </Link>
                </nav>
                <div className="mt-auto space-y-3 border-t border-slate-200 p-4">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
                    <svg
                      className="h-4 w-4 shrink-0 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-3.04 8.13-7.21 9.51-.32.1-.66.1-.98 0C8.64 20.13 5.6 16.556 5.6 12V6.317a1 1 0 01.629-.928l5.4-2.16a1 1 0 01.742 0l5.4 2.16a1 1 0 01.629.928V12z"
                      />
                    </svg>
                    <p className="text-xs font-medium text-slate-600">
                      FDIC insured · 256-bit encryption
                    </p>
                  </div>
                  <Link
                    href={"/Login"}
                    className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                  >
                    Log In
                  </Link>
                  <Link
                    href={"/Register"}
                    className="flex items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-700/20 transition-all duration-200 hover:bg-blue-800 active:scale-[0.98]"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
