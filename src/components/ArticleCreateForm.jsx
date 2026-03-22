'use client';

import { createMeArticle } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ArticleCreateForm() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()
        e.setError(null)
        e.setLoading(true)

        const title = e.target.title.value
        const content = e.target.content.value

        try {
            await createMeArticle({ title, content })

            router.push("/me/articles")

            router.refresh()
        } catch (e) {
            setError(e.message || "Erro ao publicar artigo.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Título
                </label>
                <input
                    name="title"
                    type="text"
                    placeholder="Título do artigo"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors duration-200"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Conteúdo
                </label>
                <textarea
                    name="content"
                    placeholder="Escreva o conteúdo do artigo..."
                    required
                    rows={10}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors duration-200 resize-none leading-relaxed"
                />
            </div>

            {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                    {error}
                </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-1">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-sm font-medium px-4 py-2 rounded-full border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200 cursor-pointer"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="text-sm font-medium px-5 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                >
                    {loading ? "Publicando..." : "Publicar"}
                </button>
            </div>

        </form>
    )
}
