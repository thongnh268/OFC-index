import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { IconComponent } from '../../shared/components/icon/icon.component';
import { type JobPosition } from './recruitment-content.data';

@Component({
  selector: 'app-recruitment-positions',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './recruitment-positions.component.html',
  styleUrl: './recruitment-positions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruitmentPositionsComponent {
  readonly positions = input.required<readonly JobPosition[]>();
  readonly emptyLabel = input.required<string>();
  readonly responsibilitiesLabel = input.required<string>();
  readonly requirementsLabel = input.required<string>();
  readonly compensationLabel = input.required<string>();
  readonly benefitsLabel = input.required<string>();
  protected readonly sortedPositions = computed(() =>
    [...this.positions()].sort((a, b) => Number(a.code) - Number(b.code)),
  );

  protected readonly closedCards = signal(new Set<string>());

  protected toggleCard(code: string): void {
    this.closedCards.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(code)) {
        newSet.delete(code);
      } else {
        newSet.add(code);
      }
      return newSet;
    });
  }

  protected isOpen(code: string): boolean {
    return !this.closedCards().has(code);
  }
}
