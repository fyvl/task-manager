export interface Task {
    _id: string;
    number: number;
    title: string;
    description: string;
    createdAt: string;
    dueDate?: string;
    tags?: string[];
  }