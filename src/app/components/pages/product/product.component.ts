import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpService} from "../../../servises/http.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: ProductType;

  constructor(private httpService: HttpService, private router: Router, private activatedRout: ActivatedRoute) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }
  }

  ngOnInit(): void {
    this.activatedRout.params.subscribe((params) => {
      if (params['id']) {
        this.httpService.getProduct(+params['id'])
          .subscribe({
            next: (data) => {
              this.product = data;
            },
            error: error => {
              this.router.navigate(['/']);
            }
          });
      }
    });
  }
}
