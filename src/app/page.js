import ArticleList from "@/components/ArticleList";
import NavBar from "@/components/NavBar";
import { getArticles, getMe } from "@/services/api";
import { Suspense } from "react";

export default function Home() {
    const articlesPromise = getArticles()
    const userPromise = getMe().catch(() => null)

    return (
        <div>
            <h1>Home Page</h1>
            <Suspense fallback={<p>Carregando Navbar</p>}>
                <NavBar userPromise={userPromise} />
            </Suspense>
            <Suspense fallback={<p>Carregando artigos</p>}>
                <ArticleList articlesPromise={articlesPromise} userPromise={userPromise} />
            </Suspense>
        </div>
    );
}
