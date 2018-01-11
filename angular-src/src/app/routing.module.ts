import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';
import { ProductResolver } from './services/product-resolver.service';
import { PageNotFoundComponent } from './components/404/404.component';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'searching', component: SearchComponent},
    {path: 'favorites', component: FavoritesComponent, canActivate:[AuthGuard]},
    {path: 'catalog/:category', component: CatalogComponent},
    {path: 'catalog/:category/:id', component: ProductComponent, resolve: {product: ProductResolver}},
    {path: '**', component: PageNotFoundComponent }
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}