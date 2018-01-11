import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    sections: Array<any>;
    groups: any[];
    categories: any[];
    selectedGroup: string;
    showLoader: boolean;

    constructor(private menuService: MenuService) {}

    ngOnInit() {
         this.menuService.getSections().subscribe(data => this.sections = data);
         localStorage.removeItem('savedFilter');
         localStorage.removeItem('typeSorting');
         localStorage.removeItem('currentPage');
         localStorage.removeItem('previousUrl');
    }

    onSelectSection(section: any) {
        this.showLoader = true;
        this.menuService.getGroups(section.path).subscribe(data => {
            this.categories = [];
            this.groups = data;
            let tabs = document.getElementsByClassName('tabs');
        tabs[0].scrollIntoView();
            this.selectedGroup = this.groups[0];
            this.onSelectGroup(this.selectedGroup);
            this.showLoader = false;
        });
    }

    onSelectGroup(group: any) {
        this.showLoader = true;
        this.menuService.getCategories(group.section, group.path).subscribe(data => {
            this.categories = data;
            this.showLoader = false;
        });
    }

}
