'use client';

import { deleteMeArticle } from "@/services/api";
import Link from "next/link";
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
        <div className="group relative flex flex-col justify-between border border-neutral-200 rounded-2xl p-6 hover:border-neutral-400 hover:shadow-sm transition-all duration-200">
            <Link href={`/articles/${article.id}`} className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-200 leading-snug">
                    {article.title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-3 leading-relaxed">
                    {article.content}
                </p>
            </Link>
            {showActions && (
                <div className="flex items-center gap-3 mt-4">
                    <button
                        onClick={() => router.push(`/me/articles/${article.id}/edit`)}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200 cursor-pointer">
                        Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-red-200 text-red-400 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer">
                        Excluir
                    </button>
                </div>
            )}
        </div>
    )
}
