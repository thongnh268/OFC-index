import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// Shared portrait card for people grids (Board leadership team + advisory board). A circular
// photo (or initials placeholder while assets are pending), a name, and either a single role
// title (leadership → centered) or a bullet bio (advisory → left-aligned).
@Component({
  selector: 'app-person-card',
  standalone: true,
  template: `
    <figure class="person" [class.person--advisor]="(bio()?.length ?? 0) > 0">
      <div class="person__photo">
        <div class="person__photo-inner">
          @if (photoUrl(); as src) {
            <img [src]="src" [alt]="name()" />
          } @else {
            <span class="person__initials" aria-hidden="true">{{ initials() }}</span>
          }
        </div>
      </div>
      <figcaption class="person__body">
        <p class="person__name">{{ name() }}</p>
        @if (title()) {
          <p class="person__title">{{ title() }}</p>
        }
        @if (bio()?.length) {
          <ul class="person__bio">
            @for (line of bio(); track $index) {
              <li>{{ line }}</li>
            }
          </ul>
        }
      </figcaption>
    </figure>
  `,
  styles: [
    `
      .person {
        margin: 0;
      }

      .person__photo {
        aspect-ratio: 1;
        border: 2px solid var(--color-accent);
        border-radius: 50%;
        margin: 0 auto;
        padding: 6px;
        width: 148px;
      }

      .person__photo-inner {
        align-items: center;
        background: var(--color-bg);
        border-radius: 50%;
        display: flex;
        height: 100%;
        justify-content: center;
        overflow: hidden;
        width: 100%;
      }

      /* Advisory portraits sit flush in the circle with no ring or gap. */
      .person--advisor .person__photo {
        border-color: transparent;
        padding: 0;
      }

      .person__photo img {
        height: 100%;
        object-fit: cover;
        width: 100%;
      }

      .person__initials {
        color: var(--color-accent);
        font-size: 2.25rem;
        font-weight: 700;
      }

      .person__name {
        color: var(--color-accent);
        font-size: 1rem;
        font-weight: 700;
        margin: 16px 0 4px;
        text-align: center;
      }

      .person__title {
        color: var(--color-text);
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
        text-align: center;
      }

      .person--advisor .person__name {
        text-align: left;
      }

      .person__bio {
        list-style: none;
        margin: 8px 0 0;
        padding: 0;
      }

      .person__bio li {
        color: var(--color-text);
        font-size: 0.8125rem;
        line-height: 1.5;
        margin-bottom: 6px;
        padding-left: 16px;
        position: relative;
      }

      .person__bio li::before {
        color: var(--color-accent);
        content: '•';
        left: 0;
        position: absolute;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCardComponent {
  readonly name = input.required<string>();
  readonly title = input<string>();
  readonly bio = input<readonly string[]>();
  readonly photoUrl = input<string | null>();

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase(),
  );
}
