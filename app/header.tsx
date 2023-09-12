import Link from "next/link";
import React from "react";

type Props = {};

function Header({}: Props) {
    return (
        <nav className="flex space-x-4 mb-2">
            <Link href="/" className="bg-blue-200 rounded px-4 py-2">
                Home
            </Link>
            <Link href="/board" className="bg-cyan-200 rounded px-4 py-2">
                Board
            </Link>
            <Link href="/about" className="bg-cyan-200 rounded px-4 py-2">
                About
            </Link>
        </nav>
    );
}

export default Header;