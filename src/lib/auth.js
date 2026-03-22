import { redirect } from "next/navigation";
import { getMe } from "@/services/api";

export async function requireAuth() {
    try {
        const user = await getMe();

        if (!user) {
            redirect("/");
        }

        return user;
    } catch (e) {
        redirect("/");
    }
}
