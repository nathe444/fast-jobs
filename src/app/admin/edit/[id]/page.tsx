import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJob } from '@/lib/jobs';
import { JobForm } from '@/components/admin/JobForm';
import { updateJobAction } from '@/app/actions';
import { ArrowLeft } from 'lucide-react';

interface EditJobPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
    const { id } = await params;
    const job = await getJob(id);

    if (!job) {
        notFound();
    }

    const updateActionWithId = updateJobAction.bind(null, job.id);

    return (
        <div className="container-max py-10">
            <div className="mb-8">
                <Link
                    href="/admin"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Job</h1>
            </div>

            <JobForm job={job} action={updateActionWithId} buttonLabel="Update Job" />
        </div>
    );
}
