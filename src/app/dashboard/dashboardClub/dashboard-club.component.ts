import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../club/clubs.service'; // Adjust the path as necessary
import { Chart } from 'chart.js'; // Import Chart.js for the charts

@Component({
  selector: 'app-dashboard-club',
  templateUrl: './dashboard-club.component.html',
  styleUrls: ['./dashboard-club.component.scss']
})
export class DashboardClubComponent implements OnInit {
  totalClubs: number = 0;
  totalJoinRequests: number = 0;
  approvedClubs: number = 0;
  rejectedClubs: number = 0;
  approvedClubsmmbr: number = 0;
  rejectedClubsmmbr: number = 0;
  pendingClubs: number = 0;
  pieChart: any;
  barChart: any;

  constructor(private clubService: ClubService) {}

  ngOnInit(): void {
    this.getClubsCount();
    this.getJoinRequestsCount();
    this.getClubsApprovalStatus();
    this.getClubsMmbrApprovalStatus();
  }

  getClubsCount(): void {
    this.clubService.getAllClubs().subscribe(clubs => {
      this.totalClubs = clubs.length;
    });
  }

  getJoinRequestsCount(): void {
    this.clubService.getAllClubsMemberships().subscribe(memberships => {
      this.totalJoinRequests = memberships.length;
    });
  }

  getClubsApprovalStatus(): void {
    this.clubService.getAllClubs().subscribe(clubs => {
      this.approvedClubs = clubs.filter(club => club.status === 'APPROVED').length;
      this.rejectedClubs = clubs.filter(club => club.status === 'REJECTED').length;
      this.pendingClubs = clubs.filter(club => club.status === 'PENDING').length;
      this.createPieChart();
      this.createBarChart(); // Call to create bar chart
    });
  }
  getClubsMmbrApprovalStatus(): void {
    this.clubService.getAllClubsMemberships().subscribe(clubsmmbr => {
      this.approvedClubsmmbr = clubsmmbr.filter(clubmmbr => clubmmbr.status === 'APPROVED').length;
      this.rejectedClubsmmbr = clubsmmbr.filter(clubmmbr => clubmmbr.status === 'REJECTED').length;
      this.createPieChart();
      this.createBarChart(); // Call to create bar chart
    });
  }
  createPieChart(): void {
    this.pieChart = new Chart('approvalChart', {
      type: 'pie',
      data: {
        labels: ['Approved', 'Rejected',  'Pending'],

        datasets: [{
          data: [this.approvedClubs, this.rejectedClubs , this.pendingClubs],
          backgroundColor: ['#4caf50', '#f44336',"#FDFD96"],
        }]
      }
    });
  }

  createBarChart(): void {
    this.barChart = new Chart('joinRequestChart', {
      type: 'bar',
      data: {
        labels: ['Approved', 'Rejected'],
        datasets: [{
          label: 'Join Requests',
          data: [this.rejectedClubsmmbr, this.rejectedClubsmmbr],
          backgroundColor: ['#4caf50', '#f44336'],
        }]
      },
      options: {
       
      }
    });
  }
}
