export interface Enrollment {
    id: number
    status: 'pending' | 'confirmed' | 'rejected'
    course_id: number
    created_at: string
    user?: {
        id: number
        name: string
        email: string
    }
    course: {
        id: number
        title: string
        direction: string
        schedule: string
    }
}