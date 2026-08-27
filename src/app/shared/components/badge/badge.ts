import {Component, input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

export type BadgeVariant =
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

@Component({
  selector: 'app-badge',
  imports: [
    MatIconModule
  ],
  templateUrl: './badge.html',
  styleUrl: './badge.scss'
})
export class Badge {

  readonly variant = input<BadgeVariant>('neutral');

  readonly icon = input<string | null>(null);
}
