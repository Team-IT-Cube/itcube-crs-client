import {Button} from "@/components/ui/button";

export default function Card() {
    return (
        <div className="border rounded-sm max-w-xs w-full">
            <h3>Title</h3>
            <p>Description...</p>
            <Button>Записаться</Button>
        </div>
    )
}