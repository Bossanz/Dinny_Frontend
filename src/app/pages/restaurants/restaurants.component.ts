import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './restaurants.component.html',
})
export class RestaurantsComponent implements OnInit{
  Restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  loading = false;
  searchText = '';

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.fetchRestaurants();
  }

  fetchRestaurants() {
    this.loading = true;
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.Restaurants = data;
        this.filteredRestaurants = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  toggleBan(id: number) {
    this.restaurantService.toggleBan(id).subscribe({
      next: (response) => {
        this.fetchRestaurants();
      },
      error: (err) => console.error('Toggle error:', err),
    }); 
  }

  onSearchChange() {
    const keyword = this.searchText.toLowerCase();
    this.filteredRestaurants = this.Restaurants.filter((r) =>
      [r.res_name, r.res_email, r.res_phone].some((f) =>
        f?.toLowerCase().includes(keyword)
      )
    );
  }
}
