import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Filter } from '../../../../../models/filter';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent {

    @Input() item: any;
    @Output() onChanged = new EventEmitter<any>();

    changedInput(event) {
      this.onChanged.emit(event);
    }
}