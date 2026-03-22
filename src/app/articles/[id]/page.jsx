import NavBar from "@/components/NavBar"
import { getArticlesById, getMe } from "@/services/api"
import Link from "next/link";
import { Suspense } from "react";

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

export default async function ArticleView({ params }) {
    const userPromise = getMe().catch(() => null)
    const { id } = await params
    const article = await getArticlesById(id)

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Suspense fallback={<NavBarSkeleton />}>
                <NavBar userPromise={userPromise} />
            </Suspense>
            <main className="max-w-2xl mx-auto px-6 pt-10 pb-24">

                <Link
                    href="/"
                    className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors duration-200 mb-8 inline-block"
                >
                    ← Voltar
                </Link>

                <article>
                    <h1 className="text-3xl font-bold text-neutral-900 leading-tight mb-6">
                        {article.data.title}
                    </h1>
                    <div className="w-12 h-px bg-neutral-200 mb-6" />
                    <p className="text-base text-neutral-600 leading-loose whitespace-pre-wrap">
                        {article.data.content}
                    </p>
                </article>

            </main>
        </div>
    )
}
