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
        <nav className="w-full border-b border-neutral-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href={"/"}>
                    <h1 className="text-xl font-bold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors duration-200">
                        Blog
                    </h1>
                </Link>
                <div className="flex items-center gap-4">
                    {!user && (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-200">
                                Entrar
                            </Link>
                            <Link href="/register" className="text-sm font-medium px-4 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-200">
                                Registrar
                            </Link>
                        </div>
                    )}
                    {user && (
                        <div className="flex items-center gap-5">
                            <Link href={"/me/articles"} className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-200">
                                Dashboard
                            </Link>
                            <span className="text-sm text-neutral-500">
                                Olá, {user.data.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium px-4 py-1.5 rounded-full border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200 cursor-pointer">
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav >
    )
}
