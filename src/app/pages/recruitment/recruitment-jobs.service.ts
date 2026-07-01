import { inject, Injectable } from '@angular/core';
import { catchError, map, of, type Observable } from 'rxjs';

import { RECRUITMENT_JOBS_QUERY } from '../../core/sanity/queries';
import { SanityService } from '../../core/sanity/sanity.service';
import { type JobPosition } from './recruitment-content.data';

interface RecruitmentJobDto {
  readonly code?: string | null;
  readonly title?: string | null;
  // Multi-line text: one list item per line (a leading "-" bullet is optional).
  readonly responsibilities?: string | null;
  readonly requirements?: string | null;
  readonly compensation?: string | null;
  readonly benefits?: string | null;
}

@Injectable({ providedIn: 'root' })
export class RecruitmentJobsService {
  private readonly sanity = inject(SanityService);

  getJobs(): Observable<readonly JobPosition[]> {
    return this.sanity.fetch<readonly RecruitmentJobDto[]>(RECRUITMENT_JOBS_QUERY).pipe(
      map((jobs) => (jobs ?? []).map(toJobPosition).filter(isJobPosition)),
      catchError(() => of([])),
    );
  }
}

function toJobPosition(job: RecruitmentJobDto): JobPosition | null {
  const code = job.code?.trim();
  const title = job.title?.trim();

  if (!code || !title) {
    return null;
  }

  return {
    code,
    title,
    responsibilities: toTextList(job.responsibilities),
    requirements: toTextList(job.requirements),
    compensation: job.compensation?.trim() ?? '',
    benefits: toTextList(job.benefits),
  };
}

// Split the CMS multi-line text into list items: one per line, dropping an optional
// leading "-", "•" or "*" bullet so authors can paste a dash-prefixed list verbatim.
function toTextList(value: string | null | undefined): readonly string[] {
  return (value ?? '')
    .split('\n')
    .map((line) => line.replace(/^\s*[-•*]\s*/, '').trim())
    .filter((line) => line.length > 0);
}

function isJobPosition(job: JobPosition | null): job is JobPosition {
  return job !== null;
}
