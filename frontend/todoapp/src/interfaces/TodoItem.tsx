export interface TodoItem {
    id: string | null,
    title: string,
    description: string | null,
    completedAt: string | null,
    createdAt: string | null,
    dueDate: string | null;
    isCompleted: boolean
}