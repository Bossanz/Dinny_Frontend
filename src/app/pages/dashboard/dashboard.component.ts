import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  chartData: ChartData<'pie', number[], string> = {
    labels: ['Customers', 'Restaurants', 'Riders'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#facc15', '#60a5fa', '#34d399'],
      },
    ],
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const [customers, restaurants, riders]: any = await Promise.all([
      this.http.get('/customers').toPromise(),
      this.http.get('/restaurants').toPromise(),
      this.http.get('/riders').toPromise(),
    ]);

    this.chartData.datasets[0].data = [
      customers.length,
      restaurants.length,
      riders.length,
    ];
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
