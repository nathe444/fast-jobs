export interface Job {
    id: string;
    title: string;
    company: string;
    location: string; // e.g., "Remote", "San Francisco, CA"
    description: string; // Markdown or plain text
    applyUrl: string;
    createdAt: string; // ISO string
}

export type JobInput = Omit<Job, 'id' | 'createdAt'>;
