import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from './service/loader.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
    encapsulation: ViewEncapsulation.ShadowDom,
    standalone: true,
    imports: [NgIf],
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}
}
