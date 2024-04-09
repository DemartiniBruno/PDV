# Projeto PDV

Desenvolvido em NodeJS e Angular se trata de um ponto de venda onde é possivel realizar o cadastro e venda de produtos. Vale destacar que é possivel também realizar a edição e exclusão dos produtos e também o cancelamento das vendas concluídas.

## Primeiros Passos

### Pré-requisitos

NodeJS
Postegres
Angular

### 🔧 Instalação

Após realizar o download do projeto é necessário verificar e ajustar, caso necessário, a conexão para seu banco. Isso deve ser feito pelo arquivo db-create.js <./backend/src/db> alterando a declaração do sequelize.

```
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    storage: 'postgres',
    username: 'postgres',
    password: 'admin'
});
```

Com o banco confirugado ja será possivel iniciar o serviço da API, para isso deve executar o seguinte comando dentro da pasta <./backend>

```
npm start
```

Dessa forma a API já estará funcional e retornando as requisições realizadas.

Por fim para iniciar o front-end do projeto deve executar o comando a seguir dentro da pasta <./frontend>

```
ng serve
```

Com isso feito já é possivel navegar pela aplicação, cadastrado e realizando a venda de produtos.

## Implantação

Até o momento parte das configurações do sistema esta estatica, então uma proxima implementação é tanto as paginas de configuração quanto os metodos de controle em si, como por exemplo para alterar a numeração das notas iniciais, por padrão iniciam como 1 quando o banco é criado.

## Construído com

O projeto foi desenvolvido em NodeJS e Angular, utilizando algumar bibliotecas adicionais no NodeJS para complementar as demandas.

* [NodeJS](https://nodejs.org/docs/latest/api/) - O framework usado para desenvolver o back-end
  Bibliotecas utilizadas em conjunto com o NodeJS para construção da API:
  * [Express]<4.19.1> 
  * [Body Parser]<1.20.2> 
  * [Cors]<2.8.5> 
  * [Sequelize]<6.37.1> 
* [Angular](https://angular.io/docs) - O framework usado para desenvolver o front-end
