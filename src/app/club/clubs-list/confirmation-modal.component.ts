import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="modal.dismiss('Cancel click')">Cancel</button>
      <button type="button" class="btn btn-success" (click)="confirmAction()">Confirm</button>
    </div>
  `
})
export class ConfirmationModalComponent {
  title: string;
  message: string;
  action: () => void;

  constructor(public modal: NgbActiveModal) {}

  confirmAction() {
    if (this.action) {
      this.action();
    }
    this.modal.close('Confirm click');
  }
}
