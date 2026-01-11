import Link from 'next/link';
import { getJobs } from '@/lib/jobs';
import { logout } from '@/lib/auth';
import { deleteJobAction } from '@/app/actions';
import { Plus, LogOut, Pencil, Trash2 } from 'lucide-react';

export default async function AdminPage() {
    const jobs = await getJobs();

    return (
        <div className="container-max py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Dashboard</h1>
                    <p className="text-muted-foreground">Manage your job listings.</p>
                </div>
                <div className="flex items-center gap-4">
                    <form action={logout}>
                        <button className="text-sm text-muted-foreground hover:text-red-500 flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </form>
                    <Link
                        href="/admin/new"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:bg-foreground/90 h-10 px-4 py-2"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Post New Job
                    </Link>
                </div>
            </div>

            <div className="border border-border rounded-lg divide-y divide-border bg-card">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                            <div>
                                <Link href={`/jobs/${job.id}`} className="font-semibold hover:underline">
                                    {job.title}
                                </Link>
                                <div className="text-sm text-muted-foreground">
                                    {job.company} • {job.location}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/admin/edit/${job.id}`}
                                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                    title="Edit"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Link>
                                <form action={deleteJobAction.bind(null, job.id)}>
                                    <button
                                        type="submit"
                                        className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-muted-foreground">
                        No jobs found. Start by posting one!
                    </div>
                )}
            </div>
        </div>
    );
}
