import Link from 'next/link';
import { JobForm } from '@/components/admin/JobForm';
import { createJobAction } from '@/app/actions';
import { ArrowLeft } from 'lucide-react';

export default function NewJobPage() {
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
                <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
            </div>

            <JobForm action={createJobAction} buttonLabel="Publish Job" />
        </div>
    );
}
