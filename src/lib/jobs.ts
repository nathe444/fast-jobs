import fs from 'fs/promises';
import path from 'path';
import { Job, JobInput } from './types';

const dataFilePath = path.join(process.cwd(), 'src/lib/data/jobs.json');

export async function getJobs(): Promise<Job[]> {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data) as Job[];
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

export async function getJob(id: string): Promise<Job | undefined> {
    const jobs = await getJobs();
    return jobs.find((job) => job.id === id);
}

export async function createJob(jobInput: JobInput): Promise<Job> {
    const jobs = await getJobs();
    const newJob: Job = {
        ...jobInput,
        id: Math.random().toString(36).substr(2, 9), // Simple ID generation
        createdAt: new Date().toISOString(),
    };

    jobs.unshift(newJob); // Add to beginning
    await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
    return newJob;
}

export async function updateJob(id: string, jobInput: JobInput): Promise<Job | null> {
    const jobs = await getJobs();
    const index = jobs.findIndex((j) => j.id === id);

    if (index === -1) return null;

    const updatedJob = {
        ...jobs[index],
        ...jobInput,
    };

    jobs[index] = updatedJob;
    await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
    return updatedJob;
}

export async function deleteJob(id: string): Promise<boolean> {
    const jobs = await getJobs();
    const newJobs = jobs.filter((job) => job.id !== id);

    if (jobs.length === newJobs.length) return false;

    await fs.writeFile(dataFilePath, JSON.stringify(newJobs, null, 2));
    return true;
}
