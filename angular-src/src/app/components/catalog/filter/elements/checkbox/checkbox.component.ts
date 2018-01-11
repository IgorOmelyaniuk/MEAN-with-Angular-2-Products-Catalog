import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Filter } from '../../../../../models/filter';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {

    @Input() item: any;
    @Output() onChanged = new EventEmitter<any>();

    changedCheckbox(event) {
      this.onChanged.emit(event);
    }
}
