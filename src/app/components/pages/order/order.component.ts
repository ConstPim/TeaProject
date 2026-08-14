import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormType} from "../../../types/form.type";
import {HttpService} from "../../../servises/http.service";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  submitError: boolean = false;
  submitOk: boolean = false;

  signInForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-ЯёЁ\s-]+$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-ЯёЁ\s-]+$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]),
    country: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    product: new FormControl({value: '', disabled: true}),
    address: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-ЯёЁ0-9\s\/-]+$/)]),
    comment: new FormControl('')
  })

  get name() {
    return this.signInForm.get('name');
  }

  get last_name() {
    return this.signInForm.get('last_name');
  }

  get phone() {
    return this.signInForm.get('phone');
  }

  get country() {
    return this.signInForm.get('country');
  }

  get zip() {
    return this.signInForm.get('zip');
  }

  get product() {
    return this.signInForm.get('product');
  }

  get address() {
    return this.signInForm.get('address');
  }

  get comment() {
    return this.signInForm.get('comment');
  }

  constructor(private activatedRout: ActivatedRoute, private httpService: HttpService) {
  }

  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.activatedRout.queryParams.subscribe((params) => {
      if (params['product']) {
        this.signInForm.patchValue({
          product: params['product']
        });
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  createOrder() {
    if (this.signInForm.valid) {
      const formData = this.signInForm.getRawValue() as FormType;
      this.httpService.createOrder(formData)
        .subscribe(responce => {
          if (responce.success && !responce.massage) {
            this.submitOk = true;
            this.signInForm.reset();
          } else {
            this.submitError = true;
          }
        })
    }
  }
}
