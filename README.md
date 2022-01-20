# Automação de Testes de Api com Cypress

Esse aqui é um simples projeto para estudo onde tentei aplicar um pouco do conhecimento de Cypress para montar testes de API.
Utilizei a api do https://gorest.co.in/ o qual disponibila uma API simples com um CRUD básico e montei os testes e os cenários
em volta dessa API focando nas requests focados nos usuários.

- O projeto foi organizado utilizando Custom Commands e Cucumber.


### 📋 Pré-requisitos

Todos os pré-requisitos para rodar os testes deste repositório estão disponíveis na própria documentação do Cypress
https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements


### 🔧 Instalação

Após clonar o repositório, é necessário istalar npm.

Rodar o seguinte comando no projeto:

```
npm install
```

Ao finalizar, execute o seguinte comando para abrir o cypress pela primeira vez:

```
npx cypress run
```

# Arquitetura do projeto:
```
Api-Tests---Cypress/
  ├─  cypress/
  │        │
  │        ├── fixtures/
  │        │   ├── *.json
  │        │
  │        ├── integration/
  │        │   ├── User/
  │        │   │   ├──  DELETE.spec.js
  │        │   │   ├──  GET.spec.js
  │        │   │   ├──  POST.spec.js
  │        │       └──  UPDATE.spec.js
  │        │
  │        ├── plugins/
  │        │   └── index.js
  │        │
  │        ├── report/
  │        │   └── mocha/
  │        │         └── mochafiles (*.json, *html)
  │        │
  │        ├── support/
  │        │   ├── Commands.js
  │        │   └── index.js
  │        │  
  │        └── videos/
  │ 
  ├── .gitlab-ci.yml
  ├── node_modules/
  ├── cypress.json
  ├── cypress.env.json
  ├── package-lock.json
  ├── package.json
  └── README.md
```
# 🚀 Estrutura do projeto:

O diretório Cypress é organizado da seguinte maneira:

### Fixtures:

- Nessa pasta estão as massas de dados que serão criadas para que os testes sejam realizados. Sendo assim os testes que irão rodar nesse
projeto irão utilizar os dados armazenados nessa pasta.

- Esses dados são gerados aleatóriamente para que os testes possam rodar de forma independente e bem dinâmica.

### Integrations:

- Nessa pasta estão dividas os testes por 'method' da requisição tipo POST, GET...

- Os testes em cada pasta tem seus cenários os quais estão montados em uma estrutura de cucumber do tipo:

Given...

When...

Then...

- Exemplo:


- E em cada teste existem algumas validações que são feitas no response da requisição.
-Exemplo:



### 📄 Report:

- Nessa pasta serão criados os relatórios ao final da execução de todos os testes...



## ⚙️ Executando os testes

Explicar como executar os testes automatizados para este sistema.

### 🔩 Analise os testes de ponta a ponta

Explique que eles verificam esses testes e porquê.

```
Dar exemplos
```

### ⌨️ E testes de estilo de codificação

Explique que eles verificam esses testes e porquê.

```
Dar exemplos
```

## 📦 Desenvolvimento

Adicione notas adicionais sobre como implantar isso em um sistema ativo

## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - O framework web usado
* [Maven](https://maven.apache.org/) - Gerente de Dependência
* [ROME](https://rometools.github.io/rome/) - Usada para gerar RSS

## 🖇️ Colaborando

Por favor, leia o [COLABORACAO.md](https://gist.github.com/usuario/linkParaInfoSobreContribuicoes) para obter detalhes sobre o nosso código de conduta e o processo para nos enviar pedidos de solicitação.

## 📌 Versão

Nós usamos [SemVer](http://semver.org/) para controle de versão. Para as versões disponíveis, observe as [tags neste repositório](https://github.com/suas/tags/do/projeto). 

## ✒️ Autores

Mencione todos aqueles que ajudaram a levantar o projeto desde o seu início

* **Um desenvolvedor** - *Trabalho Inicial* - [umdesenvolvedor](https://github.com/linkParaPerfil)
* **Fulano De Tal** - *Documentação* - [fulanodetal](https://github.com/linkParaPerfil)

Você também pode ver a lista de todos os [colaboradores](https://github.com/usuario/projeto/colaboradores) que participaram deste projeto.

## 📄 Licença

Este projeto está sob a licença (sua licença) - veja o arquivo [LICENSE.md](https://github.com/usuario/projeto/licenca) para detalhes.

## 🎁 Expressões de gratidão

* Conte a outras pessoas sobre este projeto 📢
* Convide alguém da equipe para uma cerveja 🍺 
* Obrigado publicamente 🤓.
* etc.


