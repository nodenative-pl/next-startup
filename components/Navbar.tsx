import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";

async function Navbar() {

    const session = await auth()

    return (
        <header className="px-5 py-5 bg-white">
            <nav className="flex justify-between items-center">
                <Link className="navbar-brand" href='/'>
                    <Image src="/logo.svg" alt="logo" width={200} height={40}/>
                </Link>

                <div className="flex gap-5 text-black">
                    {session && session?.user
                        ? <>
                            <Link href={`/startup/create}`}>
                                <span>Create</span>
                            </Link>
                            <form action={async () => {
                                'use server'
                                await signOut({redirectTo: '/'})
                            }}>
                                <button type='submit'>Logout</button>
                            </form>
                            <Link href={`/user/${session.user?.id}`}>
                                <span>{session.user?.name}</span>
                            </Link>
                        </>
                        :
                        <>
                            <form action={async () => {
                                'use server'
                                await signIn('github')
                            }}>
                                <button type='submit'>Login</button>
                            </form>
                        </>
                    }
                </div>
            </nav>
        </header>
    );
}

export default Navbar;