import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

    @Input() showLoader: boolean;
    @Input() selectedGroup: string;
    @Input() groups: any[];
    @Input() categories: any[];
    @Output() selectGroup = new EventEmitter();

    constructor (private router: Router) {}

    ngOnInit() {
        this.groups = [];
        this.categories = [];
    }

    onSelectGroup(group: any) {
        this.selectedGroup = group;
        this.selectGroup.emit(group);
    }

    onSelectCategory(category: any) {
        this.router.navigate(
            ['catalog', category.path]
        );
    }

}
