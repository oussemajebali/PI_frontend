import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ClubService } from '../clubs.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../shared/auth/auth.service';
import { ConfirmationModalComponent } from './confirmation-modal.component'; // Import the confirmation modal
import { DeleteModalContentComponent } from 'app/users/users-list/users-list.component';

@Component({
  selector: 'app-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.scss', '../../../assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClubsListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  tempData: any[] = [];
  isAdmin: boolean = false;

  public columns = [
    { name: 'ID', prop: 'id' },
    { name: 'Name', prop: 'name' },
    { name: 'Leader', prop: 'leader' },
    { name: 'Description', prop: 'description' },
    { name: 'Status', prop: 'status' },
    { name: 'Actions', prop: 'actions' }
  ];
  joinRequests: any;

  constructor(
    private clubService: ClubService,
    private router: Router,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getCurrentUserName() === 'UNIVERSITY_ADMIN'; // Check if admin
    this.loadClubs();
    this.loadJoinRequests(); // Load stored join requests
    this.cdRef.detectChanges();
  }
  
  loadJoinRequests() {
    // Fetch join requests from local storage
    const requests = localStorage.getItem('clubJoinRequests');
    if (requests) {
      this.joinRequests = JSON.parse(requests);
    }
  }
  

  loadClubs() {
    this.clubService.getAllClubs().subscribe(
      (clubs) => {
        this.rows = clubs.sort((a, b) => a.id - b.id);
        this.tempData = [...this.rows];
      },
      (error) => {
        console.error('Failed to fetch clubs', error);
      }
    );
  }
  approveRequest(membership: any) {
    this.clubService.approveJoinRequest(membership).subscribe(
      () => {
        this.loadJoinRequests();
        console.log("approved" , membership); // Reload join requests
      },
      (error) => {
        console.error('Failed to approve request', error);
      }
    );
  }
  
  rejectRequest(membership: any) {
    this.clubService.rejectJoinRequest(membership).subscribe(
      () => {
        this.loadJoinRequests(); // Reload join requests
      },
      (error) => {
        console.error('Failed to reject request', error);
      }
    );
  }
  
  
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(d => {
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

  editClub(club) {
    if (club != null) {
      this.router.navigate(['/clubs/edit', club.id], { state: { club } });
    }
  }

  deleteClub(id: number) {
    const modalRef = this.modalService.open(DeleteModalContentComponent);
    modalRef.componentInstance.clubId = id;

    modalRef.result.then((result) => {
      if (result === 'Confirm delete') {
        this.clubService.deleteClub(id).subscribe(
          () => {
            this.loadClubs();
          },
          (error) => {
            console.error('Failed to delete club', error);
          }
        );
      }
    });
  }

  openConfirmationModal(action: () => void, title: string, message: string) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.action = action;

    modalRef.result.then((result) => {
      if (result === 'Confirm click') {
        if (action) {
          action();
        }
      }
    });
  }

  approveClub(id: number) {
    this.openConfirmationModal(
      () => this.clubService.approveClub(id).subscribe(
        () => this.loadClubs(),
        (error) => console.error('Failed to approve club', error)
      ),
      'Confirm Approval',
      'Do you want to approve this club creation request?'
    );
  }

  rejectClub(id: number) {
    this.openConfirmationModal(
      () => this.clubService.rejectClub(id).subscribe(
        () => this.loadClubs(),
        (error) => console.error('Failed to reject club', error)
      ),
      'Confirm Rejection',
      'Do you want to reject this club creation request?'
    );
  }
}
