import { Component, OnInit , ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { StatisticsService } from './statistics.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit {


  statistics: any;

  @ViewChild('barChart', { static: false }) barChart: ElementRef;
  @ViewChild('pieChart', { static: false }) pieChart: ElementRef;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe(data => {
      console.log('Fetched statistics:', data); // Log the fetched data
      this.statistics = data;
      this.initializeCharts(); // Ensure charts are initialized after data is fetched
    }, error => {
      console.error('Error fetching statistics:', error); // Log any errors
      alert('Error fetching statistics. Please try again later.');
    });
  }

  ngAfterViewInit(): void {
    // Chart initialization moved to a separate method to ensure it is called after data is fetched
  }

  initializeCharts(): void {
    // Initialize charts only if statistics data is available and ViewChild elements are set
    setTimeout(() => {
      if (this.statistics) {
        this.createBarChart();
        this.createPieChart();
      }
    }, 0);
  }

  createBarChart(): void {
    if (this.barChart && this.barChart.nativeElement) {
      const ctx = this.barChart.nativeElement.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Spaces', 'Total Reservations'],
          datasets: [{
            label: 'Statistics',
            data: [this.statistics.totalSpaces, this.statistics.totalReservations],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
        }
      });
    } else {
      console.error('Bar chart element is not defined.');
    }
  }

  createPieChart(): void {
    if (this.pieChart && this.pieChart.nativeElement) {
      const ctx = this.pieChart.nativeElement.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.statistics.mostReservedSpaces.map(space => space[0]),
          datasets: [{
            data: this.statistics.mostReservedSpaces.map(space => space[1]),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    } else {
      console.error('Pie chart element is not defined.');
    }
  }
}
