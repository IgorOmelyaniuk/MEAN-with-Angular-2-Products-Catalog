import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

    @Input() sections: Array<any>;
    @Output() selectSection = new EventEmitter();
    selectedSection: string;

    onSelectSection(section: any) {
        this.selectedSection = section;
        this.selectSection.emit(section);
    }

}
