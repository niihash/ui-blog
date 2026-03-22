import { use } from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articlesPromise, userPromise }) {
    const articles = use(articlesPromise)
    const user = use(userPromise)

    console.log(articles)
    console.log(user)

    return (
        <div>
            {articles.data.length === 0 && (
                <p>Nenhum artigo encontrado.</p>
            )}
            {articles.data.map(article => (

                < ArticleCard
                    key={article.id}
                    article={article}
                    showActions={user && article.user_id === user.data.id}
                />
            ))}
        </div>
    )
}
