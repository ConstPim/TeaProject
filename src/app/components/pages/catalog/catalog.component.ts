import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../servises/http.service";
import {ProductType} from "../../../types/product.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  products: ProductType[] = [];

  constructor(private httpService: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.httpService.getProducts().subscribe({
      next: (data: ProductType[]): void => {
        this.products = data;
        console.log(data);
      },
      error: (error): void => {
        console.log(error);
        this.router.navigate(['/']);
      }
    })
  }
}
