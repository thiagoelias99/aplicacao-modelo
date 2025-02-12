<h1 align="center">Aplicação para precificação dinâmica de produtos (MVP)</h1>

<p align="center">
<a href="https://nextjs.org/">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
</a>
<a href="https://reactjs.org/">
  <img src="https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react" />
</a>
<a href="https://www.typescriptlang.org">
<img src="https://img.shields.io/badge/TypeScript-black?style=for-the-badge&logo=typescript" />
</a>
<a href="https://github.com/colinhacks/zod">
  <img src="https://img.shields.io/badge/Zod-black?style=for-the-badge&logo=zod"/>
</a>
<a href="https://tailwindcss.com/">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-000000?style=for-the-badge&logo=tailwind-css" />
</a>
<a href="https://github.com/colinhacks/zod">
  <img src="https://img.shields.io/badge/ShadCn%20ui-000000?style=for-the-badge&logo=shadcnui"/>
</a>
<a href="https://www.prisma.io/">
<img src="https://img.shields.io/badge/Prisma-000000?style=for-the-badge&logo=prisma" />
</a>
<a href="https://www.postgresql.org/">
  <img src="https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql&logoColor=336791" />
</a>
<a href="https://www.docker.com/">
  <img src="https://img.shields.io/badge/Docker-000000?style=for-the-badge&logo=docker&logoColor=2496ED" />
</a>
<a href="https://aws.amazon.com/">
  <img src="https://img.shields.io/badge/AWS-000000?style=for-the-badge&logo=amazonwebservices&logoColor=FF9900" />
</a>
</p>

<p align="center">
<img src="./docs/screenshots/cover.png" width="720px"/>
</p>

<h2 align="center">Aplicação MVP desenvolvida para um comércio de marmitas, com o objetivo de substituir uma planilha de cálculo automático de preços dos produtos</h2>
Autorizado o uso do MVP da aplicação com algumas modificações para portfólio pessoal.

## Recursos

### Autenticação e Controle de Acesso

🔹 Login via e-mail ou Google  
🔹 Gerenciamento de usuários com permissões de acesso (admin, gerente, colaborador)

### Telas de Ingredientes

🔹 Registro de ingredientes com campos como nome, preço da embalagem, unidade de medida e categoria  
🔹 Cálculo automático do custo por unidade  
🔹 Atualização automática de preços ao alterar o valor da embalagem

### Tela de Produtos

🔹 Registro de produtos com seleção de ingredientes cadastrados para composição de receitas  
🔹 Cálculo automático do custo total dos ingredientes  
🔹 Registro de tempo de preparo e rendimento da receita  
🔹 Área de anotações personalizadas (somente texto)  
🔹 Precificação em diferentes canais de venda  
🔹 Configuração da margem de lucro desejada
🔹 Visualização otimizada para impressão

### Tela de Configuração de Precificação

🔹 Registro de taxas para diferentes canais de venda  
🔹 Configuração da margem de lucro desejada

### Outros Recursos

🔹 Interface adaptável para desktop e mobile  
🔹 Modo claro e escuro para melhor usabilidade  
🔹 Conformidade com LGPD (Lei Geral de Proteção de Dados)  
🔹 Política de privacidade  
🔹 Notificação de cookies

### Galeria de Imagens

#### Login e perfil do usuário

<p align="center">
<img src="./docs/screenshots/usuario.png" width="720px"/>
</p>

#### Listagem e cadastro de ingredientes

<p align="center">
<img src="./docs/screenshots/ingredientes.png" width="720px"/>
</p>

#### Listagem e cadastro de produtos (modo escuro)

<p align="center">
<img src="./docs/screenshots/produtos.png" width="720px"/>
</p>

#### Visualização para impressão e precificação

<p align="center">
<img src="./docs/screenshots/visualizacao.png" width="720px"/>
</p>

## Instalação com Docker

🔹 Necessário o [Node.js](https://nodejs.org/pt) na versão 18+  
🔹 Necessário configurar conta no [Kinde Auth](https://kinde.com/)  
🔹 Renomear o arquivo `.env.docker.example` para `.env.docker` e configurar as variáveis de ambiente  
🔹 Executar o script automatizado `npm run docker:prod`  
🔹 Acessar a aplicação no [http://localhost:3000/app/inicio](http://localhost:3000/app/inicio)
