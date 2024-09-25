import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ClubService } from '../clubs.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../shared/auth/auth.service';
import { ConfirmationModalComponent } from './confirmation-modal.component';

@Component({
  selector: 'app-clubs-list',
  templateUrl: './join-list.component.html',
  styleUrls: ['./join-list.component.scss', '../../../assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JoinListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  tempData: any[] = [];
  isAdmin: boolean = false;
  joinRequests: any;

  public columns = [
    { name: 'Club ID', prop: 'clubId' },  // Add this line
    { name: 'ID', prop: 'id' },
    { name: 'Name', prop: 'name' },
    { name: 'Position', prop: 'position' },
    { name: 'Reason', prop: 'reason' },
    { name: 'Status', prop: 'status' },
    { name: 'Actions', prop: 'actions' }
  ];
  

  constructor(
    private clubService: ClubService,
    private router: Router,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getCurrentUserName() === 'UNIVERSITY_ADMIN'; // Check if admin
    this.loadJoinRequests(); // Load stored join requests
    this.loadClubs();
    this.loadClubsmm(); // Load memberships (approved/rejected)
    this.cdRef.detectChanges();
  }

  loadJoinRequests() {
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

  loadClubsmm() {
    this.clubService.getAllClubsMemberships().subscribe(
      (memberships) => {
        this.rows = memberships.sort((a, b) => a.id - b.id);
        this.tempData = [...this.rows];
      },
      (error) => {
        console.error('Failed to fetch club memberships', error);
      }
    );
  }

  approveRequest(request: any) {
    this.openConfirmationModal(
      () => {
        this.clubService.approveJoinRequest(request).subscribe(
          () => {
            this.updateRequestStatus(request, 'APPROVED');
          },
          (error) => {
            console.error('Failed to approve request', error);
          }
        );
      },
      'Confirm Approval',
      `Do you want to approve the join request for ${request.name}?`
    );
  }

  rejectRequest(request: any) {
    this.openConfirmationModal(
      () => {
        this.clubService.rejectJoinRequest(request).subscribe(
          () => {
            this.updateRequestStatus(request, 'REJECTED');
          },
          (error) => {
            console.error('Failed to reject request', error);
          }
        );
      },
      'Confirm Rejection',
      `Do you want to reject the join request for ${request.name}?`
    );
  }

  updateRequestStatus(request: any, status: string) {
    request.status = status;
    this.saveJoinRequestsToLocalStorage();
    this.loadClubsmm();
  }

  saveJoinRequestsToLocalStorage() {
    localStorage.setItem('clubJoinRequests', JSON.stringify(this.joinRequests));
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
}
