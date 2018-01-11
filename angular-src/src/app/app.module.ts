import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './routing.module';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TabsComponent } from './components/home/tabs/tabs.component';
import { NavComponent } from './components/home/nav/nav.component';
import { HeaderComponent } from './components/_shared/header/header.component';
import { FooterComponent } from './components/_shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FilterComponent } from './components/catalog/filter/filter.component';
import { ListComponent } from './components/catalog/list/list.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ProductComponent } from './components/product/product.component';
import { ReviewComponent } from './components/product/reviews/review.component';
import { SearchComponent } from './components/search/search.component';
import { NewProductsComponent } from './components/home/new-products/new-products.component';
import { CheckboxComponent } from './components/catalog/filter/elements/checkbox/checkbox.component';
import { RangeComponent } from './components/catalog/filter/elements/range/range.component';
import { PageNotFoundComponent } from './components/404/404.component';

//Services
import { AuthenticationService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { ReviewService } from './services/review.service';
import { FilterService } from './services/filter.service';
import { SearchService } from './services/search.service';
import { MenuService } from './services/menu.service';
import { ProductResolver } from './services/product-resolver.service';

//Another Modules
import { NgxPaginationModule } from 'ngx-pagination';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { NgSpinningPreloader } from 'ng2-spinning-preloader';
import { SpinnerComponentModule } from 'ng2-component-spinner';

//Guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CatalogComponent,
    FilterComponent,
    ListComponent,
    FavoritesComponent,
    ProductComponent,
    ReviewComponent,
    CheckboxComponent,
    RangeComponent,
    SearchComponent,
    NewProductsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgxPaginationModule,
    FlashMessagesModule,
    SpinnerComponentModule
  ],
  providers: [
    AuthenticationService,
    ProductService,
    AuthGuard,
    ReviewService,
    FilterService,
    SearchService,
    MenuService,
    ProductResolver,
    NgSpinningPreloader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
