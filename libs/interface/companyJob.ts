interface job {
  id?: string;
  title: string;
  desc?: string | null;
  image: string;
  created_at?: Date;
}

interface JobsProps {
  initialJobs: any;
}

export type { job, JobsProps };
