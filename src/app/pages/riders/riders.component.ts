import { Component, OnInit } from '@angular/core';
import { RiderService } from '../../services/rider.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-riders',
  imports: [CommonModule, HttpClientModule, FormsModule ],
  standalone: true,
  templateUrl: './riders.component.html',
})
export class RidersComponent implements OnInit{
  Riders: any[] = [];
  filteredRiders: any[] = [];
  loading = false;
  searchText = '';

  constructor(private riderService: RiderService) {}

  ngOnInit() {
    this.fetchRiders();
  }

  fetchRiders() {
    this.loading = true;
    this.riderService.getRiders().subscribe({
      next: (data) => {
        this.Riders = data;
        this.filteredRiders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  toggleBan(id: number) {
    this.riderService.toggleBan(id).subscribe({
      next: (response) => {
        this.fetchRiders();
      },
      error: (err) => console.error('Toggle error:', err),
    });
  }
  onSearchChange() {
    const keyword = this.searchText.toLowerCase();
    this.filteredRiders = this.Riders.filter((ri) =>
      [ri.rid_name, ri.rid_email, ri.rid_phone].some((f) =>
        f?.toLowerCase().includes(keyword)
      )
    );
  }
}
