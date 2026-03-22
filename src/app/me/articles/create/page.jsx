import ArticleCreateForm from "@/components/ArticleCreateForm"
import NavBar from "@/components/NavBar";
import { requireAuth } from "@/lib/auth";
import { getMe } from "@/services/api"
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

export default async function MeArticlesCreate() {
    await requireAuth()

    const userPromise = getMe().catch(() => null)

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Suspense fallback={<NavBarSkeleton />}>
                <NavBar userPromise={userPromise} />
            </Suspense>
            <main className="max-w-2xl mx-auto px-6 pt-8 pb-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-xl font-semibold text-neutral-900">Novo artigo</h1>
                        <p className="text-sm text-neutral-400 mt-1">Preencha os campos e publique seu artigo</p>
                    </div>
                    <Link
                        href="/me/articles"
                        className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors duration-200"
                    >
                        ← Voltar
                    </Link>
                </div>
                <ArticleCreateForm />
            </main>
        </div>
    )
}
