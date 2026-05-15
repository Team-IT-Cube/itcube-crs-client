"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button";
import {serverFetch} from "@/lib/api";
import {endpoint} from "@/endpoints";
import {useAuthStore} from "@/store/authStore";
import {toast} from "sonner";
import {ApiResponse} from "@/interfaces/api";
import {useRouter} from "next/navigation";

export default function LogoutButton() {
    const { logout, token } = useAuthStore();
    const router = useRouter();

    async function logoutSubmit() {
        try {
            await serverFetch(endpoint.logout, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            logout();
            router.push("/login");
        } catch (err) {
            console.error(err);
            const error = err as ApiResponse<null>;
            if (error.error) {
                toast.error(error.error.message);
                return
            }
            toast.error("Проблемы с сервером");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="cursor-pointer">Выйти</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Ты уверен что хочешь выйти?</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Нет</AlertDialogCancel>
                    <AlertDialogAction onClick={logoutSubmit}>Да</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}