import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: [
    "./users-list.component.scss",
    "../../../assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  tempData: any[];

  public columns = [
    { name: "ID", prop: "userId" },
    { name: "Email", prop: "email" },
    { name: "Name", prop: "name" },
    { name: "Age", prop: "age" },
    { name: "Enabled", prop: "enabled" },
    { name: "Role", prop: "role" },
    { name: "Status", prop: "accountNonExpired" },
    { name: "Actions", prop: "actions" },
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef // Inject NgbModal here
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.cdRef.detectChanges();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.rows = users.sort((a, b) => new Date(b.userId).getTime() - new Date(a.userId).getTime());
        this.tempData = [...this.rows]; // Keep the original order for filtering
        console.log("users :", users);
      },
      (error) => {
        console.error('Failed to fetch users', error);
      }
    );
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return Object.keys(d).some(key => {
        if (d[key] !== null && d[key] !== undefined) {
          return d[key].toString().toLowerCase().indexOf(val) !== -1;
        }
        return false;
      });
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  editUser(user) {
    if (user != null) {
      this.router.navigate(['/users/edit', user.userId], { state: { user } });
      console.log("user redirected to update", user);
    } else {
      console.log("user not redirected", user);
    }
  }

  deleteUser(id: number) {
    const modalRef = this.modalService.open(DeleteModalContentComponent);
    modalRef.componentInstance.userId = id;

    modalRef.result.then((result) => {
      if (result === 'Confirm delete') {
        this.userService.deleteUser(id).subscribe(
          () => {
            console.log(`User number ${id} deleted successfully`);
            this.loadUsers(); // Reload the list of users after deletion
          },
          (error) => {
            console.error('Failed to delete user', error);
          }
        );
      }
    }, (reason) => {
      console.log(`Dismissed with reason: ${reason}`);
    });
  }
}
@Component({
  selector: 'delete-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirm Delete</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete user number: {{ userId }}?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="confirmDelete()">Delete</button>
      <button type="button" class="btn btn-secondary" (click)="modal.dismiss('Cancel click')">Cancel</button>
    </div>
  `
})
export class DeleteModalContentComponent {
  userId: number;

  constructor(public modal: NgbActiveModal) {}

  confirmDelete() {
    this.modal.close('Confirm delete');
  }
}