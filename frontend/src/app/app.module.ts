import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarDefaultComponent } from './components/navbar-default/navbar-default.component';
import { ListaDadosComponent } from './components/lista-dados/lista-dados.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarDefaultComponent,
    ListaDadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
