import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { Routes, provideRouter, withDebugTracing } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {path: 'category/:id', component: ProductListComponent}
  {path: 'category', component: ProductListComponent}
  {path: 'products', component: ProductListComponent}
  {path: '', redirectTo: '/products', pathMatch: 'full'}
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
]

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideRouter(routes, withDebugTracing())
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
