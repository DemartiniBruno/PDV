import { Produto } from "./Produto"

export interface Itens_venda {
    id:number,
    quantidade:string,
    valor_unitario:string,
    valor_total_item:string,
    createdAt:any,
    updatedAt:any,
    deletedAt:any,
    produto_id:number,
    venda_id:number,
    produto:Produto
  }