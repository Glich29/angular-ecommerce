import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HttpClientModule } from '@angular/common/http';
import {ProductCategoryMenuComponent} from "./components/product-category-menu/product-category-menu.component";
import {SearchComponent} from "./components/search/search.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, ProductListComponent, HttpClientModule,
    ProductCategoryMenuComponent, SearchComponent, NgbModule]
})
export class AppComponent {
  title = 'angular-ecommerce';
}
