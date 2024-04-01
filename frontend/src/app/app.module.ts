import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarDefaultComponent } from './components/navbar-default/navbar-default.component';
import { ListaDadosComponent } from './components/lista-dados/lista-dados.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatMenuModule} from '@angular/material/menu';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { CadastroVendaComponent } from './pages/cadastro-venda/cadastro-venda.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarDefaultComponent,
    ListaDadosComponent,
    HomeComponent,
    ProdutosComponent,
    VendasComponent,
    CadastroProdutoComponent,
    CadastroVendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
