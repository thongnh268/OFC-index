import { inject, Injectable } from '@angular/core';
import { catchError, map, of, type Observable } from 'rxjs';

import { RECRUITMENT_JOBS_QUERY } from '../../core/sanity/queries';
import { SanityService } from '../../core/sanity/sanity.service';
import { type JobPosition } from './recruitment-content.data';

interface LocalizedListItemDto {
  readonly text?: string | null;
}

interface RecruitmentJobDto {
  readonly code?: string | null;
  readonly title?: string | null;
  readonly responsibilities?: readonly LocalizedListItemDto[] | null;
  readonly requirements?: readonly LocalizedListItemDto[] | null;
  readonly compensation?: string | null;
  readonly benefits?: readonly LocalizedListItemDto[] | null;
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

function toTextList(items: readonly LocalizedListItemDto[] | null | undefined): readonly string[] {
  return (items ?? [])
    .map((item) => item.text?.trim() ?? '')
    .filter((text): text is string => text.length > 0);
}

function isJobPosition(job: JobPosition | null): job is JobPosition {
  return job !== null;
}
