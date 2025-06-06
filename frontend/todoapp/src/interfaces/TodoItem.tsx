export interface TodoItem {
    id: string,
    title: string,
    description?: string | null,
    completedAt?: string | null,
    dueDate: string;
    isCompleted: boolean
}