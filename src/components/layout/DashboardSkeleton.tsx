import { Skeleton } from "@/components/ui/skeleton";

export default function DasboardSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-80" />
        </div>
    )
}