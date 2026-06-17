import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../icon/icon.component';

// One certificate in the grid. thumbnailUrl/pdfUrl are optional: when absent the card shows
// a placeholder (award icon + title) so the grid renders before real assets are supplied.
export interface CertificateItem {
  readonly title: string;
  readonly thumbnailUrl?: string | null;
  readonly pdfUrl?: string | null;
}

// Shared certificate grid (Figma: 3-column grid of A4-ish PDF previews). A card links to its
// PDF when a url is present; otherwise it renders as a non-interactive placeholder.
@Component({
  selector: 'app-certificate-grid',
  standalone: true,
  imports: [IconComponent],
  template: `
    <ul class="cert-grid">
      @for (cert of items(); track cert.title) {
        <li>
          <a
            class="cert-card"
            [attr.href]="cert.pdfUrl || null"
            [attr.target]="cert.pdfUrl ? '_blank' : null"
            [attr.rel]="cert.pdfUrl ? 'noopener noreferrer' : null"
          >
            @if (cert.thumbnailUrl) {
              <img class="cert-thumb" [src]="cert.thumbnailUrl" [alt]="cert.title" />
            } @else {
              <span class="cert-placeholder">
                <app-icon name="experience" [size]="40" />
                <span class="cert-title">{{ cert.title }}</span>
              </span>
            }
          </a>
        </li>
      }
    </ul>
  `,
  styles: [
    `
      .cert-grid {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .cert-card {
        align-items: center;
        aspect-ratio: 348 / 481;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text-muted);
        display: flex;
        justify-content: center;
        overflow: hidden;
        text-decoration: none;
      }

      a.cert-card[href]:hover {
        border-color: var(--color-accent);
      }

      .cert-thumb {
        height: 100%;
        object-fit: cover;
        width: 100%;
      }

      .cert-placeholder {
        align-items: center;
        color: var(--color-accent);
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        text-align: center;
      }

      .cert-title {
        color: var(--color-text);
        font-size: 0.8125rem;
        line-height: 1.4;
      }

      @media (max-width: 767.98px) {
        .cert-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateGridComponent {
  readonly items = input.required<readonly CertificateItem[]>();
}
