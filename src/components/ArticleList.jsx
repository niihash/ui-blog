import { use } from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articlesPromise, userPromise }) {
    const articles = use(articlesPromise)
    const user = use(userPromise)

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            {articles.data.length === 0 && (
                <p className="text-sm text-neutral-400 text-center py-16">Nenhum artigo encontrado.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.data.map(article => (
                    < ArticleCard
                        key={article.id}
                        article={article}
                        showActions={user && article.user_id === user.data.id}
                    />
                ))}
            </div>
        </div>
    )
}
