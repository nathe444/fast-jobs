import { getJobs } from '@/lib/jobs';
import { JobCard } from '@/components/jobs/JobCard';

export default async function JobsPage() {
    const jobs = await getJobs();

    return (
        <div className="container-max py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">All Jobs</h1>
                <p className="text-muted-foreground">
                    Browse our curated list of opportunities.
                </p>
            </div>

            <div className="space-y-4">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-lg">
                        No active job listings found.
                    </div>
                )}
            </div>
        </div>
    );
}
