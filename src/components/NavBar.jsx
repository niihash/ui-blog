'use client';

import { logout } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function NavBar({ userPromise }) {
    const user = use(userPromise)
    const router = useRouter()

    async function handleLogout() {
        try {
            await logout();

            router.push("/")
            router.refresh()
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <nav className="w-full border-b bg-white shadow-sm">
            <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
                <Link href={"/"}><h1>Blog</h1></Link>
                {!user && (
                    <div>
                        <Link href="/login">Entrar</Link>
                        <Link href="/register">Registrar</Link>
                    </div>
                )}
                {user && (
                    <div>
                        <Link href={"/me/articles"}>Dashboard</Link>
                        <p>Olá, {user.data.name}</p>
                        <button onClick={handleLogout}>Sair</button>
                    </div>
                )}
            </div>
        </nav>
    )
}
