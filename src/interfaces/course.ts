export interface Course {
    id: number,
    title: string,
    direction: string,
    teacher_id: number,
    max_slots: number,
    schedule: string,
    status: string,
    created_at: string,
    updated_at: string,
    teacher: {
        id: number,
        name: string
    }
}