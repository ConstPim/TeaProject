import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {timer, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('content') popupTemplate!: ElementRef;

  private popupSubscription!: Subscription;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.popupSubscription = timer(10000).subscribe(() => {
      this.modalService.open(this.popupTemplate);
    });
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }
}
