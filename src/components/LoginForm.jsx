'use client';

import { login } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState(null)
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        try {
            await login({ email, password })

            router.push("/me/articles")

            router.refresh()

        } catch (e) {
            setError(e.message || "Erro ao fazer login")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input name="email" type="email" placeholder="Email" required />
            </div>
            <div>
                <label>Senha:</label>
                <input name="password" type="password" placeholder="Senha" required />
            </div>
            <div>
                <button type="submit">Entrar</button>
            </div>
            {error && (<p>{error}</p>)}
        </form>
    )
}
