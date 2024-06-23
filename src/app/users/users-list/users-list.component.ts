import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { UserService } from "../user.service";

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.rows = users;
        this.tempData = users;
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
      return d.username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }
}
