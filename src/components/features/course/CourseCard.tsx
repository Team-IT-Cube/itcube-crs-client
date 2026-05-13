import {Button} from "@/components/ui/button";
import {Course} from "@/interfaces/course";

export default function CourseCard({ course }: { course: Course }) {
    return (
        <div className="border rounded-sm max-w-xs w-full">
            <h3>{course.title || "empty"}</h3>
            <p>{course.direction || "empty"}</p>
            <p>{course.status === "active" ? "Активна" : null}</p>
            <Button>Записаться</Button>
        </div>
    )
}