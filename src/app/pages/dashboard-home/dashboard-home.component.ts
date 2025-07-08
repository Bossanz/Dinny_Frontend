import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { dashboardService } from '../../services/dashboard.service'; // 👈 import

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit {
  pieChartData: number[] = [];
  pieChartLabels: string[] = ['Customers', 'Restaurants', 'Riders'];
  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  reports: any[] = [];
  loading = false;
  searchText = '';


  constructor(private dashboardService: dashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.pieChartData = [
          data.customers || 0,
          data.restaurants || 0,
          data.riders || 0,
        ];
      },
      error: (err) => console.error('Failed to fetch stats:', err),
    });

    this.fetchReports();
  }

  fetchReports() {
    this.loading = true;
    this.dashboardService.getReports().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
}
