import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'users-listing-app';
  isLoading: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading;
        this.changeDetectorRef.detectChanges();
      }
    );
  }
}
