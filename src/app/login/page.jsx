import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Login() {
    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
            <div className="w-full max-w-sm border border-neutral-200 rounded-2xl p-8 bg-white shadow-sm">

                <div className="mb-8 text-center">
                    <Link href="/" className="text-2xl font-bold text-neutral-900 hover:text-neutral-600 transition-colors duration-200">
                        Blog
                    </Link>
                    <p className="mt-2 text-sm text-neutral-400">
                        Entre na sua conta para continuar
                    </p>
                </div>
                <LoginForm />
                <p className="text-xs text-center text-neutral-400 mt-6">
                    Não tem uma conta?{" "}
                    <Link href="/register" className="text-neutral-700 font-medium hover:text-neutral-900 transition-colors duration-200">
                        Registrar
                    </Link>
                </p>
            </div>
        </div>
    )
}
