export interface TabsDashboard {
    id: number
    label: string
    value: string
}

export interface StatusLabel {
    pending: "Ожидает",
    confirmed: "Подтверждена",
    rejected: "Отклонена",
}

export interface StatusColor {
    pending: "bg-yellow-50 text-yellow-600 border-yellow-100",
    confirmed: "bg-green-50 text-green-600 border-green-100",
    rejected: "bg-red-50 text-red-600 border-red-100",
}