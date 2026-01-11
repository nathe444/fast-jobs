import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJob } from '@/lib/jobs';
import { ArrowLeft, Building2, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface JobPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function JobPage({ params }: JobPageProps) {
    const { id } = await params;
    const job = await getJob(id);

    if (!job) {
        notFound();
    }

    const date = new Date(job.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="container-max py-10">
            <div className="mb-8">
                <Link
                    href="/jobs"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Jobs
                </Link>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                    {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-foreground text-sm md:text-base">
                    <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {job.company}
                    </span>
                    <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Posted on {date}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">
                <div className="prose prose-neutral max-w-none text-foreground/90 leading-relaxed">
                    {/* 
            In a real app, this might be rendered Markdown. 
            For this MVP, we treat description as plain text or simple HTML-like structure if we add a parser.
            For now, just displaying text with whitespace preservation.
          */}
                    <div className="whitespace-pre-wrap">{job.description}</div>
                </div>

                <div className="md:sticky md:top-24 h-fit">
                    <div className="border border-border rounded-lg p-6 bg-card">
                        <h3 className="font-bold text-lg mb-4">Interested?</h3>
                        <a
                            href={job.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:bg-foreground/90 h-11 px-8 mb-4"
                        >
                            Apply for this Job <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                        <p className="text-xs text-muted-foreground text-center">
                            Target opens in a new tab.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
