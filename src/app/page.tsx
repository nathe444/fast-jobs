import Link from 'next/link';
import { getJobs } from '@/lib/jobs';
import { JobCard } from '@/components/jobs/JobCard';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const jobs = await getJobs();
  const recentJobs = jobs.slice(0, 5); // Show latest 5

  return (
    <div className="container-max py-12 md:py-20">
      {/* Hero Section */}
      <section className="mb-16 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Find your next <span className="text-muted-foreground">minimalist</span> career move.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
          A curated list of remote and onsite jobs for developers, designers, and tech professionals.
          No distractions, just quality opportunities.
        </p>
        <div className="pt-4">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:bg-foreground/90 h-11 px-8"
          >
            Browse All Jobs
          </Link>
        </div>
      </section>

      {/* Job List Preview */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Latest Openings</h2>
          <Link href="/jobs" className="text-sm font-medium flex items-center hover:underline">
            View all <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {recentJobs.length > 0 ? (
            recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
              No jobs posted yet. Check back later!
            </div>
          )}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/jobs" className="text-sm font-medium hover:underline">
            View all jobs →
          </Link>
        </div>
      </section>
    </div>
  );
}
