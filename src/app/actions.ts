'use server';

import { createJob, updateJob, deleteJob } from '@/lib/jobs';
import { JobInput } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createJobAction(formData: FormData) {
    const jobInput: JobInput = {
        title: formData.get('title') as string,
        company: formData.get('company') as string,
        location: formData.get('location') as string,
        description: formData.get('description') as string,
        applyUrl: formData.get('applyUrl') as string,
    };

    await createJob(jobInput);
    revalidatePath('/jobs');
    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function updateJobAction(id: string, formData: FormData) {
    const jobInput: JobInput = {
        title: formData.get('title') as string,
        company: formData.get('company') as string,
        location: formData.get('location') as string,
        description: formData.get('description') as string,
        applyUrl: formData.get('applyUrl') as string,
    };

    await updateJob(id, jobInput);
    revalidatePath(`/jobs/${id}`);
    revalidatePath('/jobs');
    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function deleteJobAction(id: string) {
    await deleteJob(id);
    revalidatePath('/jobs');
    revalidatePath('/');
    revalidatePath('/admin');
}
