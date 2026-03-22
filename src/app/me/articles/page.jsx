import ArticleList from "@/components/ArticleList"
import NavBar from "@/components/NavBar"
import { getMe, getMeArticles } from "@/services/api"
import Link from "next/link"
import { Suspense } from "react"

export default function MeArticles() {
    const articlesPromise = getMeArticles()
    const userPromise = getMe().catch(() => null)

    return (
        <div>
            <h1>Artigos Pessoais - Logado</h1>
            <Suspense fallback={<p>Carregando Navbar</p>}>
                <NavBar userPromise={userPromise} />
            </Suspense>
            <div>
                <Link href={"/me/articles/create"}>Create</Link>
                <Suspense fallback={<p>Carregando artigos</p>}>
                    <ArticleList articlesPromise={articlesPromise} userPromise={userPromise} />
                </Suspense>
            </div>
        </div>
    )
}
