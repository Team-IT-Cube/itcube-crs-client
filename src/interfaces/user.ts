export interface User {
    id: number
    name: string
    email: string
    role: 'student' | 'teacher' | 'admin'
}

export interface UserLabel {
    student: "Ученик",
    teacher: "Преподаватель",
    admin: "Администратор",
}

export interface UserRoleColor {
    student: "bg-blue-50 text-blue-600 border-blue-100",
    teacher: "bg-green-50 text-green-600 border-green-100",
    admin: "bg-purple-50 text-purple-600 border-purple-100",
}