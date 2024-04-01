import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { DetalheProdutoComponent } from './pages/detalhe-produto/detalhe-produto.component';
import { DetalheVendaComponent } from './pages/detalhe-venda/detalhe-venda.component';
// import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
// import { CadastroVendaComponent } from './pages/cadastro-venda/cadastro-venda.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'produtos/:id', component: DetalheProdutoComponent},
  {path: 'vendas', component: VendasComponent},
  {path: 'vendas/:id', component: DetalheVendaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
