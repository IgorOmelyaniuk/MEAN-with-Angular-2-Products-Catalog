import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product';
import { Filter } from '../../../models/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

    @Input() filter: Filter;
    @Output() changedFilter = new EventEmitter();
    openedFilter: boolean;

    toggleFilter() {
      this.openedFilter = !this.openedFilter;
    }

    //Brand Filter
    private handleBrandCheckBox(event: any) {
      let filterValue = event.target.firstElementChild.value;
      event.target.firstElementChild.checked = !event.target.firstElementChild.checked;
      this.filter.brands.forEach(brand => {
        if(filterValue === brand.name)
          brand.checked = event.target.firstElementChild.checked ? true : false;
      });
      this.changedFilter.emit(this.filter);
    }

    //Filter Price
    private handlePriceInput(event: any): void {
      let prop = event.target.name;
      let value = event.target.value;
      if (value.length >= 3) {
        this.filter[prop] = value;
        this.changedFilter.emit(this.filter);
      }
    }

    //Filter Range
    private handleRangeInput(event: any) {
      let field = event.target.placeholder,
      x = field.indexOf('.'),
      prop = field.substring(x + 1),
      value = event.target.value,
      facetName = event.target.name;

      this.filter.params.forEach(param => {
        if (param.title === facetName) param[prop] = value;
      });

      this.changedFilter.emit(this.filter);
    }

    //Filter Params
    private handleParamCheckBox(event: any) {
      let filterName = event.target.firstElementChild.name,
      filterValue = event.target.firstElementChild.value;
      event.target.firstElementChild.checked = !event.target.firstElementChild.checked;

      this.filter.params.forEach(param => {
        if (filterName === param.title) {
          param.values.forEach(value => {
            if (filterValue === value.name)
              value.checked = event.target.firstElementChild.checked ? true : false;
          });
        }
      });

      this.changedFilter.emit(this.filter);
    }

}
