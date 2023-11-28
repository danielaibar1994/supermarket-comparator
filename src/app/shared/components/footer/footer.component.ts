import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [NgClass],
})
export class FooterComponent {
  @Input() supermarketsSelected!: { [key: string]: boolean };

  @Output() supermarketChange = new EventEmitter<string>();

  clickSupermarket(name: string) {
    this.supermarketChange.emit(name);
  }
}
