import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService } from './service/loader.service';


@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
    encapsulation: ViewEncapsulation.ShadowDom,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: []
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}
}
