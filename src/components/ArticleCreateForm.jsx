'use client';

import { createMeArticle } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ArticleCreateForm() {
    const [error, setError] = useState(null)
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()

        const title = e.target.title.value
        const content = e.target.content.value

        try {
            await createMeArticle({ title, content })

            router.push("/me/articles")

            router.refresh()
        } catch (e) {
            setError(e.message || "Erro ao publicar artigo.")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título:</label>
                <input name="title" type="text" placeholder="Título" required />
            </div>
            <div>
                <label>Conteúdo:</label>
                <textarea name="content" placeholder="Conteúdo" required></textarea>
            </div>
            <div>
                <button type="submit">Publicar</button>
            </div>
            {error && (<p> {error}</p>)}
        </form >
    )
}
