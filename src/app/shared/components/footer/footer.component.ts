import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SUPERMARKETS_LIST } from './constant/markets-list';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  @Input() supermarketsSelected!: { [key: string]: boolean };

  @Output() supermarketChange = new EventEmitter<string>();

  SUPERMARKETS_LIST = SUPERMARKETS_LIST.filter((market) => market.sector === 1);
  SUPERMARKETS_LIST_SECOND = SUPERMARKETS_LIST.filter(
    (market) => market.sector === 2
  );
  SUPERMARKETS_LIST_THIRD = SUPERMARKETS_LIST.filter(
    (market) => market.sector === 3
  );

  clickSupermarket(name: string) {
    this.supermarketChange.emit(name);
  }
}
