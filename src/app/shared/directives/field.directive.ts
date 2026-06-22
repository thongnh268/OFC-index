import { Directive } from '@angular/core';

// Style carrier for native form controls - native semantics, mobile keyboards and
// a11y stay intact. Visuals live in src/styles.css (`.field`, @layer components).
@Directive({
  selector: 'input[appField], textarea[appField], select[appField]',
  standalone: true,
  host: { class: 'field' },
})
export class FieldDirective {}
