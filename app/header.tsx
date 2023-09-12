'use client';

import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {};

function Header({}: Props) {
    const { data: session } = useSession();
    console.log('session >> ', session)
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
            <button onClick={() => signIn()}>Login</button>
            <button onClick={() => signOut()}>Logout</button>
        </nav>
    );
}

export default Header;