import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Map } from 'azure-maps-control';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapTarget') matTarget: ElementRef<HTMLElement> | undefined;

  map: Map | undefined;

  private readySubject = new ReplaySubject<boolean>(1);
  ready$ = this.readySubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.map = new Map(this.matTarget?.nativeElement as HTMLElement, {
        center: [-118.270293, 34.039737],
        zoom: 14,
        view: 'Auto',
        authType: 'subscriptionKey',
        subscriptionKey: 'key-here',
      });
    }
  }
}
