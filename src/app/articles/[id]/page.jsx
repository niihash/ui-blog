import NavBar from "@/components/NavBar"
import { getArticlesById, getMe } from "@/services/api"

export default async function ArticleView({ params }) {
    const userPromise = getMe().catch(() => null)
    const { id } = await params
    const article = await getArticlesById(id)

    return (
        <div>
            <NavBar userPromise={userPromise} />
            <h1>{article.data.title}</h1>
            <p>{article.data.content}</p>
        </div>
    )
}
