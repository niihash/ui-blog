'use client';

import { login } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const email = e.target.email.value
        const password = e.target.password.value

        try {
            await login({ email, password })

            router.push("/me/articles")

            router.refresh()

        } catch (e) {
            setError(e.message || "Erro ao fazer login")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email:
                </label>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors duration-200" />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Senha:
                </label>
                <input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors duration-200" />
            </div>
            {error && (<p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{error}</p>)}
            <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer mt-1">
                {loading ? "Entrando..." : "Entrar"}
            </button>
        </form>
    )
}
