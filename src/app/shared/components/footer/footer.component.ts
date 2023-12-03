import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [NgClass, NgIf],
})
export class FooterComponent {
  @Input() supermarketsSelected!: { [key: string]: boolean };

  @Output() supermarketChange = new EventEmitter<string>();

  clickSupermarket(name: string) {
    this.supermarketChange.emit(name);
  }
}
