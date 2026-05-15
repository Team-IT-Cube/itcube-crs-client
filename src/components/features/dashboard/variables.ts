import {StatusColor, StatusLabel, TabsDashboard} from "@/interfaces/dashboard";
import {UserRoleColor, UserLabel} from "@/interfaces/user";

export const tabs: TabsDashboard[] = [
    { id: 1, label: "Профиль", value: "overview" },
    { id: 3, label: "Мои курсы", value: "courses" },
];

export const roleLabel: UserLabel = {
    student: "Ученик",
    teacher: "Преподаватель",
    admin: "Администратор",
}

export const roleColor: UserRoleColor = {
    student: "bg-blue-50 text-blue-600 border-blue-100",
    teacher: "bg-green-50 text-green-600 border-green-100",
    admin: "bg-purple-50 text-purple-600 border-purple-100",
}

export const statusLabel: StatusLabel = {
    pending: "Ожидает",
    confirmed: "Подтверждена",
    rejected: "Отклонена",
}

export const statusColor: StatusColor = {
    pending: "bg-yellow-50 text-yellow-600 border-yellow-100",
    confirmed: "bg-green-50 text-green-600 border-green-100",
    rejected: "bg-red-50 text-red-600 border-red-100",
}