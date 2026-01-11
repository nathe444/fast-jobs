import Link from 'next/link';
import { Job } from '@/lib/types';
import { MapPin, Building2, Clock } from 'lucide-react';

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    // Format date to relative time or simple date string
    const date = new Date(job.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });

    return (
        <Link
            href={`/jobs/${job.id}`}
            className="block group border border-border rounded-lg p-5 hover:border-foreground/30 transition-all hover:shadow-sm bg-card mb-4"
        >
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors mb-1">
                        {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            {job.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                        </span>
                    </div>
                </div>

                <div className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {date}
                </div>
            </div>
        </Link>
    );
}
