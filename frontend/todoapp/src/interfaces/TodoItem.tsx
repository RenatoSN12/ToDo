export interface TodoItem {
    id: string | null,
    title: string,
    description?: string | null,
    completedAt?: string | null,
    dueDate: string | null;
    isCompleted: boolean
}