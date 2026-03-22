'use client';

import { deleteMeArticle } from "@/services/api";
import { useRouter } from "next/navigation";

export default function ArticleCard({ article, showActions = false }) {
    const router = useRouter()

    async function handleDelete() {
        if (!confirm('Tem certeza que deseja excluir?')) return;

        try {
            await deleteMeArticle(article.id)

            router.refresh()
        } catch (e) {
            console.error(e)
            alert('Erro ao excluir artigo')
        }
    }

    return (
        <div>
            <h3>{article.title}</h3>
            {showActions && (
                <div>
                    <button onClick={() => router.push(`/me/articles/${article.id}/edit`)}>Editar</button>
                    <button onClick={handleDelete}>Excluir</button>
                </div>
            )}
        </div>
    )
}
