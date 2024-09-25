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
  pieChart: any;
  lineChart: any; // Rename this for clarity

  constructor(private clubService: ClubService) {}

  ngOnInit(): void {
    this.getClubsCount();
    this.getJoinRequestsCount();
    this.getClubsApprovalStatus();
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
      this.createPieChart();
      this.createLineChart(); // Call to create line chart
    });
  }

  createPieChart(): void {
    this.pieChart = new Chart('approvalChart', {
      type: 'pie',
      data: {
        labels: ['Approved', 'Rejected'],
        datasets: [{
          data: [this.approvedClubs, this.rejectedClubs],
          backgroundColor: ['#4caf50', '#f44336'],
        }]
      }
    });
  }

  createLineChart(): void {
    this.lineChart = new Chart('joinRequestChart', {
      type: 'line', // Change the type to 'line'
      data: {
        labels: ['Approved', 'Rejected'], // Labels for the X-axis
        datasets: [
          {
            label: 'Approved Join Requests',
            data: [this.approvedClubs, 0], // First point for approved
            borderColor: '#4caf50', // Green color for approved line
            backgroundColor: 'rgba(76, 175, 80, 0.2)', // Light green background
            fill: true, // Fill area under the line
          },
          {
            label: 'Rejected Join Requests',
            data: [0, this.rejectedClubs], // Second point for rejected
            borderColor: '#f44336', // Red color for rejected line
            backgroundColor: 'rgba(244, 67, 54, 0.2)', // Light red background
            fill: true, // Fill area under the line
          }
        ]
      },
      options: {
        scales: {
          // Use 'x' and 'y' for Chart.js v3+
          x: {
            type: 'category', // Specify the x-axis type
            title: {
              display: true,
              text: 'Approval Status'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Requests'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false // Allows chart to resize
      }
    });
  }
}
