import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-access-modal',
    imports: [CommonModule],
    templateUrl: './access-modal.component.html',
    styleUrl: './access-modal.component.css'
})
export class AccessModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  close(): void {
    this.showModal = false;
    this.closeModal.emit();
  }
}
