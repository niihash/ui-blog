import ArticleList from "@/components/ArticleList"
import NavBar from "@/components/NavBar"
import { getMe, getMeArticles } from "@/services/api"
import Link from "next/link"
import { Suspense } from "react"

function NavBarSkeleton() {
    return (
        <div className="w-full border-b border-neutral-200 bg-white/90 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="h-4 w-16 bg-neutral-200 rounded-full animate-pulse" />
                <div className="h-4 w-32 bg-neutral-200 rounded-full animate-pulse" />
            </div>
        </div>
    );
}

function ArticleListSkeleton() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="border-b border-neutral-200 py-6 flex flex-col gap-3">
                    <div className="h-4 w-2/3 bg-neutral-200 rounded-full animate-pulse" />
                    <div className="h-3 w-full bg-neutral-100 rounded-full animate-pulse" />
                    <div className="h-3 w-4/5 bg-neutral-100 rounded-full animate-pulse" />
                </div>
            ))}
        </div>
    );
}

export default function MeArticles() {
    const articlesPromise = getMeArticles()
    const userPromise = getMe().catch(() => null)

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Suspense fallback={<NavBarSkeleton />}>
                <NavBar userPromise={userPromise} />
            </Suspense>
            <main className="max-w-5xl mx-auto px-6 pt-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-semibold text-neutral-900">Meus Artigos</h1>
                    <Link
                        href={"/me/articles/create"}
                        className="text-sm font-medium px-4 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-200">
                        Novo Artigo
                    </Link>
                </div>
                <Suspense fallback={<ArticleListSkeleton />}>
                    <ArticleList articlesPromise={articlesPromise} userPromise={userPromise} />
                </Suspense>
            </main>
        </div>
    )
}
