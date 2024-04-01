import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { CadastroVendaComponent } from './pages/cadastro-venda/cadastro-venda.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'produtos/:id', component: CadastroProdutoComponent},
  {path: 'vendas', component: VendasComponent},
  {path: 'vendas/:id', component: CadastroVendaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
