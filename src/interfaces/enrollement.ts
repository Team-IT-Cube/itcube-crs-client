export interface Enrollment {
    id: number
    status: 'pending' | 'confirmed' | 'rejected'
    enrolled_at: string
    course: {
        id: number
        title: string
        direction: string
        schedule: string
    }
}