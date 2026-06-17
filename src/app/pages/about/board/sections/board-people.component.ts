import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PersonCardComponent } from '../../../../shared/components/person-card/person-card.component';

export interface PersonEntry {
  readonly name: string;
  readonly title?: string;
  readonly bio?: readonly string[];
  readonly photoUrl?: string | null;
}

// A centred section heading + responsive grid of app-person-card. Reused on the Board page
// for both the Leadership Team (title cards) and the Advisory Board (bullet-bio cards).
@Component({
  selector: 'app-board-people',
  standalone: true,
  imports: [PersonCardComponent],
  template: `
    <section class="people">
      <h2 class="inner-heading-center">{{ heading() }}</h2>
      <ul class="people__grid">
        @for (person of people(); track person.name) {
          <li>
            <app-person-card
              [name]="person.name"
              [title]="person.title"
              [bio]="person.bio"
              [photoUrl]="person.photoUrl ?? null"
            />
          </li>
        }
      </ul>
    </section>
  `,
  styles: [
    `
      .people__grid {
        align-items: start;
        display: grid;
        gap: 32px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        list-style: none;
        margin: 0;
        padding: 0;
      }

      @media (max-width: 767.98px) {
        .people__grid {
          gap: 28px;
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPeopleComponent {
  readonly heading = input.required<string>();
  readonly people = input.required<readonly PersonEntry[]>();
}
