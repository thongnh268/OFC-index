import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { IconComponent, type IconName } from '../../../../shared/components/icon/icon.component';

export interface OrgRole {
  readonly icon: IconName;
  readonly label: string;
  readonly highlight?: boolean;
}

interface OrgConnectorPath {
  readonly d: string;
  readonly key: string;
  readonly tone: 'accent' | 'primary';
}

interface OrgConnectorDot {
  readonly cx: number;
  readonly cy: number;
  readonly key: string;
  readonly r: number;
  readonly tone: 'accent' | 'primary';
}

interface OrgConnectorLayout {
  readonly dots: readonly OrgConnectorDot[];
  readonly height: number;
  readonly paths: readonly OrgConnectorPath[];
  readonly width: number;
}

// Organisational chart for the Board page: two stacked leadership boxes (Chairman → Executive
// Board) feeding a vertical column of director roles, with a parallel column of factory/division
// managers branching off via dashed connectors. Connectors are pure CSS (spine + stubs) so they
// stay aligned at any width and collapse when the columns stack on narrow screens.
@Component({
  selector: 'app-board-org-chart',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="org" #orgRoot>
      @if (connectorLayout(); as connector) {
        <svg
          class="org__connectors"
          [attr.viewBox]="'0 0 ' + connector.width + ' ' + connector.height"
          [style.height.px]="connector.height"
          [style.width.px]="connector.width"
          aria-hidden="true"
          focusable="false"
        >
          @for (path of connector.paths; track path.key) {
            <path
              class="org__connector"
              [class.org__connector--accent]="path.tone === 'accent'"
              [attr.d]="path.d"
              [attr.stroke]="path.tone === 'accent' ? accentColor : primaryColor"
              vector-effect="non-scaling-stroke"
            />
          }

          @for (dot of connector.dots; track dot.key) {
            <circle
              class="org__dot"
              [class.org__dot--accent]="dot.tone === 'accent'"
              [attr.cx]="dot.cx"
              [attr.cy]="dot.cy"
              [attr.fill]="dot.tone === 'accent' ? accentColor : primaryColor"
              [attr.r]="dot.r"
            />
          }
        </svg>
      }

      <div class="org__leadership">
        <div class="org__box org__box--chairman">
          <span class="org__box-icon"><app-icon name="people" [size]="24" /></span>
          <span>{{ chairman() }}</span>
        </div>
        <div class="org__box org__box--executive">
          <span class="org__box-icon"><app-icon name="people" [size]="24" /></span>
          <span>{{ executive() }}</span>
        </div>
      </div>

      <div class="org__grid" role="list">
        @for (role of directors(); track role.label) {
          <div
            class="org-node org-node--director"
            [class.org-node--highlight]="role.highlight"
            role="listitem"
          >
            <span class="org-node__icon"><app-icon [name]="role.icon" [size]="22" /></span>
            <span class="org-node__label">{{ role.label }}</span>
          </div>
        }

        @if (managers().length) {
          <div class="org__managers" role="list" [style.grid-row]="managerGridRow()">
            @for (role of managers(); track role.label) {
              <div class="org-node org-node--manager" role="listitem">
                <span class="org-node__icon"><app-icon [name]="role.icon" [size]="22" /></span>
                <span class="org-node__label">{{ role.label }}</span>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('orgRoot') private orgRoot?: ElementRef<HTMLElement>;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  private measureTimer = 0;
  private resizeObserver?: ResizeObserver;

  readonly chairman = input.required<string>();
  readonly executive = input.required<string>();
  readonly directors = input.required<readonly OrgRole[]>();
  readonly managers = input.required<readonly OrgRole[]>();
  readonly accentColor = '#2e7d32';
  readonly connectorLayout = signal<OrgConnectorLayout | null>(null);
  readonly primaryColor = '#1e3a5f';
  readonly managerGridRow = computed(() => {
    const highlightedIndex = this.directors().findIndex((role) => role.highlight);
    const startRow = highlightedIndex >= 0 ? highlightedIndex + 1 : 1;
    const rowSpan = Math.max(this.managers().length, 1);

    return `${startRow} / span ${rowSpan}`;
  });

  ngAfterViewInit(): void {
    if (!this.canMeasure()) {
      return;
    }

    const root = this.orgRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => this.queueConnectorMeasure());
        this.resizeObserver.observe(root);
      }
      window.addEventListener('resize', this.handleWindowResize, { passive: true });
      this.queueConnectorMeasure();
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.measureTimer && typeof window !== 'undefined') {
      window.clearTimeout(this.measureTimer);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleWindowResize);
    }
  }

  private readonly handleWindowResize = (): void => {
    this.queueConnectorMeasure();
  };

  private canMeasure(): boolean {
    return typeof window !== 'undefined';
  }

  private queueConnectorMeasure(): void {
    if (!this.canMeasure() || !this.orgRoot?.nativeElement) {
      return;
    }

    if (this.measureTimer) {
      window.clearTimeout(this.measureTimer);
    }

    this.measureTimer = window.setTimeout(() => {
      this.measureTimer = 0;
      this.measureConnectors();
    }, 0);
  }

  private measureConnectors(): void {
    const root = this.orgRoot?.nativeElement;
    if (!root) {
      return;
    }

    const chairman = root.querySelector<HTMLElement>('.org__box--chairman');
    const executive = root.querySelector<HTMLElement>('.org__box--executive');
    const grid = root.querySelector<HTMLElement>('.org__grid');
    const directorNodes = Array.from(root.querySelectorAll<HTMLElement>('.org-node--director'));
    const managerNodes = Array.from(root.querySelectorAll<HTMLElement>('.org-node--manager'));
    const highlightedDirector = root.querySelector<HTMLElement>('.org-node--highlight');

    if (!chairman || !executive || !grid || directorNodes.length === 0) {
      this.setConnectorLayout(null);
      return;
    }

    const rootRect = root.getBoundingClientRect();
    const rootStyle = getComputedStyle(root);
    const branch = this.cssNumber(rootStyle, '--s', 30);
    const radius = this.cssNumber(rootStyle, '--c', 14);
    const width = this.round(rootRect.width);
    const height = this.round(rootRect.height);
    const box = (element: HTMLElement) => element.getBoundingClientRect();
    const left = (rect: DOMRect) => this.round(rect.left - rootRect.left);
    const right = (rect: DOMRect) => this.round(rect.right - rootRect.left);
    const top = (rect: DOMRect) => this.round(rect.top - rootRect.top);
    const bottom = (rect: DOMRect) => this.round(rect.bottom - rootRect.top);
    const centerX = (rect: DOMRect) => this.round(rect.left - rootRect.left + rect.width / 2);
    const centerY = (rect: DOMRect) => this.round(rect.top - rootRect.top + rect.height / 2);

    const chairmanRect = box(chairman);
    const executiveRect = box(executive);
    const gridRect = box(grid);
    const directorRects = directorNodes.map(box);
    const firstDirectorRect = directorRects[0];
    const lastDirectorRect = directorRects[directorRects.length - 1];
    const spineX = this.round(left(firstDirectorRect) - branch);
    const gridTopY = top(gridRect);
    const lastDirectorY = centerY(lastDirectorRect);
    const lastDirectorLeft = left(lastDirectorRect);

    const paths: OrgConnectorPath[] = [
      {
        d: `M ${centerX(chairmanRect)} ${bottom(chairmanRect)} V ${top(executiveRect)}`,
        key: 'leadership-link',
        tone: 'primary',
      },
      {
        d: [
          `M ${centerX(executiveRect)} ${bottom(executiveRect)} V ${gridTopY}`,
          `H ${this.round(spineX + radius)}`,
          `Q ${spineX} ${gridTopY} ${spineX} ${this.round(gridTopY + radius)}`,
          `V ${this.round(lastDirectorY - radius)}`,
          `Q ${spineX} ${lastDirectorY} ${this.round(spineX + radius)} ${lastDirectorY}`,
          `H ${lastDirectorLeft}`,
        ].join(' '),
        key: 'primary-spine',
        tone: 'primary',
      },
    ];

    directorRects.slice(0, -1).forEach((rect, index) => {
      const y = centerY(rect);
      paths.push({
        d: `M ${spineX} ${y} H ${left(rect)}`,
        key: `director-${index}`,
        tone: 'primary',
      });
    });

    const dots: OrgConnectorDot[] = [
      {
        cx: centerX(chairmanRect),
        cy: bottom(chairmanRect),
        key: 'chairman-bottom',
        r: 7,
        tone: 'primary',
      },
      {
        cx: centerX(executiveRect),
        cy: top(executiveRect),
        key: 'executive-top',
        r: 7,
        tone: 'primary',
      },
      {
        cx: centerX(executiveRect),
        cy: bottom(executiveRect),
        key: 'executive-bottom',
        r: 7,
        tone: 'accent',
      },
      ...directorRects.slice(0, -1).map((rect, index) => ({
        cx: spineX,
        cy: centerY(rect),
        key: `director-dot-${index}`,
        r: 6,
        tone: 'primary' as const,
      })),
    ];

    if (highlightedDirector && managerNodes.length > 0) {
      const highlightedRect = box(highlightedDirector);
      const managerRects = managerNodes.map(box);
      const managerSpineX = this.round(left(managerRects[0]) - branch);
      const firstManagerY = centerY(managerRects[0]);
      const lastManagerY = centerY(managerRects[managerRects.length - 1]);

      paths.push({
        d: [
          `M ${right(highlightedRect)} ${centerY(highlightedRect)} H ${managerSpineX}`,
          `M ${managerSpineX} ${firstManagerY} V ${lastManagerY}`,
        ].join(' '),
        key: 'manager-spine',
        tone: 'accent',
      });

      managerRects.forEach((rect, index) => {
        const y = centerY(rect);
        paths.push({
          d: `M ${managerSpineX} ${y} H ${left(rect)}`,
          key: `manager-${index}`,
          tone: 'accent',
        });
        dots.push({
          cx: managerSpineX,
          cy: y,
          key: `manager-dot-${index}`,
          r: 6,
          tone: 'accent',
        });
      });
    }

    this.setConnectorLayout({ dots, height, paths, width });
  }

  private cssNumber(style: CSSStyleDeclaration, property: string, fallback: number): number {
    const value = Number.parseFloat(style.getPropertyValue(property));
    return Number.isFinite(value) ? value : fallback;
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private setConnectorLayout(layout: OrgConnectorLayout | null): void {
    this.ngZone.run(() => {
      this.connectorLayout.set(layout);
      this.cdr.markForCheck();
    });
  }
}
