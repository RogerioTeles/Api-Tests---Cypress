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

![2022-01-19 23_13_05-Window](https://user-images.githubusercontent.com/53439651/150438534-1b0accd9-395f-40d2-bddf-ade271d5b652.png)



- E em cada teste existem algumas validações que são feitas no response da requisição como por exemplo o status retornado, se é o que esperamos ao fazer a
requisição com aqueles valores, além de outras validações específicas pra cada teste. 

- Exemplo:

![validandoresponse](https://user-images.githubusercontent.com/53439651/150438767-25fa9a05-42a4-48c9-9d18-219eb8deaf5b.png)


### Report:

- Nessa pasta serão criados os relatórios ao final da execução de todos os testes.

Executando o comando abaixo, é iniciado os testes no modo Headless que, no final, 
geram um arquivo html contendo informações sobre todos os testes excecutados.
```
npm run Cypress:all
```
Explicando melhor como isso acontece, são montados arquivos .json com dados dos testes executados que depois serão
agrupados em um só para a criação do arquivo HTML

![report](https://user-images.githubusercontent.com/53439651/150440144-00cf3b15-8b97-4185-b6e7-33a677436cd4.png)


## ⚙️ Executando os testes

Existem algumas formas de executar os testes desse projeto:

1° - Abrindo a interface do cypress e executando testes um a um:

```
npx cypress open
```

2° - Rodar todos os testes em modo headless:

```
npm run Cypress:tests  Ou  npx Cypress run
```

3° - Rodar todos os testes e gerar arquivo de relatório:

```
npm run Cypress:all
```


## 👩🏼‍💻 CI

Tá, admito que a estrutura de CI é bem básica aqui mas foi muito divertido e estressante montar isso aqui  🥳🥳🥳🥳🥳🥳

A estrutura pra rodar os testes desse projeto em pipeline em uma máquina virtual foi feita usando toda a estrutura de CI do GITLAB
onde a partir do arquivo **.gitlab-ci.yml** foi possivel escrever um roteirozinho e colocar os pré-requisitos para execução desses testes na nuvem.

![gitlabci](https://user-images.githubusercontent.com/53439651/150442106-83777b7d-374c-4c4c-91d2-3f5a8c2dac1f.png)

A explicação de como funciona esse arquivo pode ser visto na [documentação do Cypress](https://docs.cypress.io/guides/continuous-integration/gitlab-ci).

Depois de montar esse arquivo e subir o projeto no gitlab, só precisei ajustar ele alguuuuuuuuumaas vezes (334556 vezes) para funcionar lindamente

## ✒️ Autores

Basicamente eu, eu e eu.

* **Rogério Teles** - *Projeto de testes* - [GitHub](https://github.com/RogerioTeles)  -  [Linkedin](https://www.linkedin.com/in/rog%C3%A9rio-teles-80a2961b6/)
* **Rogerio Teles** - *Readme* - [GitHub](https://github.com/RogerioTeles)  -  [Linkedin](https://www.linkedin.com/in/rog%C3%A9rio-teles-80a2961b6/)


## 🎁 Considerações finais

* Foi bem divertido montar tudo isso aqui (menos o readme q foi beeeeeeeeem chato) 📢
* Quem tiver sugestões de melhoria por favor me mandem mensagem no linkedin eu vou amar melhorar isso aqui.
* Espero olhar isso aqui daqui a algum tempo e encontrar pontos onde poderia melhorar depois de aprender mais.

