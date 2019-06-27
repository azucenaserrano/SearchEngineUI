import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { LocationsService } from '../services/locations.service';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  public locations: any[] = [];
  public selectLocation: any;
  public categories: any[] = [];
  public search: string = '';
  public places: any[] = [];

  constructor(private categoriesService: CategoriesService, private locationsService: LocationsService, private placesService: PlacesService) { }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(categories => {
      categories.unshift({ 'name': 'All' });
      categories.forEach(category => {
        category.icon = this.setIcon(category.name);
        category.selected = false;
      });
      this.categories = categories;
    }, error => {
      console.log(error);
    });

    this.locationsService.getLocations().subscribe(locations => {
      this.locations = locations.map(l => {
        return { 'label': l.name, 'value': { 'id': l.id, 'name': l.name } };
      });
      this.locations.unshift({ 'label': 'All Locations', 'value': { 'id': '0', 'name': 'All' } });
      this.selectLocation = this.locations[0].value;
    }, error => {
      console.log(error);
    });
  }

  setIcon(category: string): string {
    let icon = '';
    switch (category) {
      case 'All': icon = 'fa fa-circle'; break;
      case 'Restaurants': icon = 'fa fa-cutlery'; break;
      case 'Hotels': icon = 'fa fa-bed'; break;
      case 'Bars': icon = 'fa fa-glass'; break;
      case 'Coffee': icon = 'fa fa-coffee'; break;
      case 'Banks': icon = 'fa fa-bank'; break;
      case 'Gas Stations': icon = 'fa fa-archive'; break;
      case 'Parking Lots': icon = 'fa fa-product-hunt'; break;
      case 'Groceries': icon = 'fa fa-shopping-basket'; break;
      case 'Post Offices': icon = 'fa fa-envelope'; break;
      case 'Hospitals': icon = 'fa fa-plus-square'; break;
    }
    return icon;
  }

  onSearch() {
    this.getPlaces();
  }
  locationChange() {
    this.getPlaces();
  }

  categorySelected(category) {
    if (category.name === "All") {
      let selected = !category.selected;
      this.categories.forEach(cat => {
        cat.selected = selected;
      });
    }
    else {
      category.selected = !category.selected;
    }
    this.getPlaces();
  }

  //build parameters and call places api
  getPlaces() {
    let filters = [];
    if (this.selectLocation.id != 0) {
      filters.push(`location=${this.selectLocation.id}`);
    }
    if (this.search.trim() !== '') {
      filters.push(`search=${this.search}`);
    }
    let categoriesIds = this.getSelectedCategories();
    if (categoriesIds !== '') {
      filters.push(`category=${categoriesIds}`);
    }
    let params = '';
    params = filters.length > 0 ? `/?${filters.join('&')}` : '';

    //call api to get filtered places
    this.placesService.getPlaces(params).subscribe(places => {
      console.info('places-->', places);
      this.places = places;
    }, error => {
      console.log(error);
    });
  }

  //get string with the selected categories ids
  getSelectedCategories(): string {
    let catIds = this.categories.filter(c => {
      return c.name !== 'All' && c.selected;
    }).map(m => m.id).join(',');
    return catIds;
  }
}
