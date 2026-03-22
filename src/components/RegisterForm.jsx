'use client';

import { register } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const [error, setError] = useState(null)
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()

        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const password_confirmation = e.target.password_confirmation.value

        try {
            await register({ name, email, password, password_confirmation })

            router.push("/me/articles")

            router.refresh()
        } catch (e) {
            setError(e.message || "Erro ao realizar o registro")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input name="name" type="text" placeholder="Nome" required />
            </div>
            <div>
                <label>Email:</label>
                <input name="email" type="email" placeholder="Email" required />
            </div>
            <div>
                <label>Senha:</label>
                <input name="password" type="password" placeholder="Senha" required />
            </div>
            <div>
                <label>Confirmar Senha:</label>
                <input name="password_confirmation" type="password" placeholder="Confirmar Senha" required />
            </div>
            <div>
                <button type="submit">Registrar</button>
            </div>
            {error && (<p>{error}</p>)}
        </form>
    )
}
