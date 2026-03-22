import ArticleEditForm from "@/components/ArticleEditForm"
import { getMe, getMeArticle } from "@/services/api"

export default async function MeArticleEdit({ params }) {
    const userPromise = getMe().catch(() => null)
    const { id } = await params

    const articlePromise = getMeArticle(id)

    return (
        <div>
            <h1>Editar Artigo {id}</h1>
            <ArticleEditForm articlePromise={articlePromise} id={id} />
        </div>
    )
}
