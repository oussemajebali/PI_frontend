import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{title}}</h4>
      <button type="button" class="close" (click)="closeModal()">&times;</button>
    </div>
    <div class="modal-body">
      <p>{{message}}</p>
    </div>
  `,
  styles: []
})
export class ModalComponent {
  @Input() title!: string;
  @Input() message!: string;

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
  }
}
