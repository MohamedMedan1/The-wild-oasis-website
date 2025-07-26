import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Home() {
  return (
    <main className="mt-24 text-center">
      <Image src={bg} fill
        className="object-cover object-top"
        placeholder="blur"
        quality={80}
        alt="Mountains and forests with two cabins" />
      <h1 className="text-8xl text-primary-50 font-normal relative z-10 mb-10">Welcome to paradise.</h1>
      <button className="bg-accent-500 py-5 px-8 text-lg text-primary-800 font-semibold relative z-10 hover:bg-accent-600 transition-all">
        <Link href='/cabins'>Explore luxury cabins</Link>
      </button>
    </main>
    );
}
