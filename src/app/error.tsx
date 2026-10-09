"use client";
import Image from "next/image";
import errorImg from "../assets/error.jpg";
import Link from "next/link";
export default function error() {
  return (
    <div className="h-screen text-center">
      <Image src={errorImg} alt="not found" className="w-[50%] mx-auto " />
      <button className="bg-green-600 p-3 rounded-2xl">
        <Link href={"/"} className="text-white">
          {" "}
          There is an error <hr />
          go to home....?
        </Link>
      </button>
    </div>
  );
}
