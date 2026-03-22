'use client';

import { updateMeArticle } from "@/services/api";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function ArticleEditForm({ articlePromise, id }) {
    const [error, setError] = useState(null)
    const article = use(articlePromise)
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()

        const title = e.target.title.value
        const content = e.target.content.value

        try {
            await updateMeArticle(id, { title, content })

            router.push("/me/articles")
            router.refresh()
        } catch (e) {
            setError(e.message || "Erro ao enviar o formulário")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título:</label>
                <input name="title" defaultValue={article.data.title} required />
            </div>
            <div>
                <label>Conteúdo:</label>
                <textarea name="content" defaultValue={article.data.content} required ></textarea>
            </div>
            <div>
                <button type="submit">Atualizar</button>
            </div>
            {error && (<p>{error}</p>)}
        </form>
    )
}
