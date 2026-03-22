import ArticleCreateForm from "@/components/ArticleCreateForm"
import { getMe } from "@/services/api"

export default function MeArticlesCreate() {
    const userPromise = getMe().catch(() => null)

    return (
        <div>
            <h1>Criar Artigos</h1>
            <ArticleCreateForm />
        </div>
    )
}
