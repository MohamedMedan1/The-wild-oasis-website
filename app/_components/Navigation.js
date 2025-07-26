import Image from "next/image"
import Link from "next/link";
import { auth } from "../_lib/auth";
export default  async function Navigation() {
    const session = await auth();
    return (
        <nav className="text-xl z-10">
            <ul className="flex gap-16 items-center">
                <li><Link href="/cabins" className="hover:text-accent-400 transition-colors">Cabins</Link></li>
                <li><Link href="/about" className="hover:text-accent-400 transition-colors">About</Link></li>
                <li>
                    {session?.user?.image ? <Link href="/account" className="hover:text-accent-400 transition-colors flex items-center gap-5">
                        <Image src={session?.user?.image}
                            alt="user-img"
                            height={30}
                            width={30}
                            className="rounded-full h-8" referrerPolicy="no-referrer" />
                        <span>Guest area</span>
                    </Link> :
                        <Link href="/account" className="hover:text-accent-400 transition-colors">
                            Guest area
                        </Link>}
                </li>
            </ul>
        </nav>
    );
}