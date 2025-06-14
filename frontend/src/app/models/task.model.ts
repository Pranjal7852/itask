export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface Task {
    id: string; 
    title: string;
    description: string;
    status: TaskStatus;
    aiNote?: string | null; 
    createdAt: string; 
    updatedAt: string;

    isEditing?: boolean;
    isGeneratingNote?: boolean;
}