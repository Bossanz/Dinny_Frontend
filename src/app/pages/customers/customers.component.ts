import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service'; // 👈 import
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = []; // 👈 เพิ่ม
  loading = false;
  searchText = ''; // 👈 เพิ่ม

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = data; // 👈 ตั้งค่าเริ่มต้น
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  toggleBan(id: number) {
    this.customerService.toggleBan(id).subscribe({
      next: () => this.fetchCustomers(),
      error: (err) => console.error(err),
    });
  }

  onSearchChange() {
    const keyword = this.searchText.toLowerCase();
    this.filteredCustomers = this.customers.filter((c) =>
      [c.cus_name, c.cus_email, c.cus_phone].some((f) =>
        f?.toLowerCase().includes(keyword)
      )
    );
  }
}
