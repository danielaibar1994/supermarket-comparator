import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SUPERMARKETS_LIST } from './constant/markets-list';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class FooterComponent {
  @Input() supermarketsSelected!: { [key: string]: boolean };

  @Output() supermarketChange = new EventEmitter<string>();
  @Output() bulkSelectionChange = new EventEmitter<'select' | 'clear'>();

  SUPERMARKETS_LIST = SUPERMARKETS_LIST.filter((market) => market.sector === 1);
  SUPERMARKETS_LIST_SECOND = SUPERMARKETS_LIST.filter(
    (market) => market.sector === 2
  );
  SUPERMARKETS_LIST_THIRD = SUPERMARKETS_LIST.filter(
    (market) => market.sector === 3
  );

  clickSupermarket(name: string): void {
    this.supermarketChange.emit(name);
  }

  selectAll(): void {
    Object.keys(this.supermarketsSelected).forEach((key) => {
      this.supermarketsSelected[key] = true;
    });
    this.bulkSelectionChange.emit('select');
  }

  clearAll(): void {
    Object.keys(this.supermarketsSelected).forEach((key) => {
      this.supermarketsSelected[key] = false;
    });
    this.bulkSelectionChange.emit('clear');
  }
}
