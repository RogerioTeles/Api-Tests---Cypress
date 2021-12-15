
Cypress.Cmmands.add('savingGetUser', (id, name, email, gender, status) => {
    cy.writeFile('cypress/fixtures/GetUser/randomUserFromGET.json', {
        'id': id,
        'name': name,
        'email': email,
        'gender': gender,
        'status': status
    })
})

Cypress.Commands.add('savingPostUser', (id, name, email, gender, status, realMethod) => {

    var path;
    if (realMethod == 'delete') {
        path = 'cypress/fixtures/DeleteUser/userToDelete.json'
    } else if (realMethod == 'update') {
        path = 'cypress/fixtures/UpdateUser/userToBeUpdated.json'
    }
    cy.writeFile(path, {
        'id': id,
        'name': name,
        'email': email,
        'gender': gender,
        'status': status
    })
})

Cypress.Commands.add('generateRandomUser', () => {

    var gender = ['male', 'female'];
    var status = ['active', 'inactive'];

    const faker = require('faker')

    cy.writeFile('cypress/fixtures/randomUser.json', {
        'name': `${faker.name.findName()}`,
        'gender': `${faker.random.arrayElement(gender)}`,
        'email': `${faker.internet.email()}`,
        'status': `${faker.random.arrayElement(status)}`
    })
})

Cypress.Commands.add('savingRandomUser', (realMethod) => {


    cy.generateRandomUser().then(() => {
        cy.fixture('randomUser').then(randomUser => {
            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: randomUser
            }).then((res) => {
                var user = res.body.data;
                cy.savingPostUser(user.id, user.name, user.email, user.gender, user.status, realMethod);
            })
        });
    })
})

Cypress.Commands.add('generateUpdateRandomUser', () => {
    //need to create a random user using the savingrandomuser
    var gender = ['male', 'female'];
    var status = ['active', 'inactive'];
    const faker = require('faker');
    
    cy.writeFile('cypress/fixtures/UpdateUser/updatingAllUser.json', {
        'name': `${faker.name.findName()}`,
        'gender': `${faker.random.arrayElement(gender)}`,
        'email': `${faker.internet.email()}`,
        'status': `${faker.random.arrayElement(status)}`
    })

    //then i need to create a random data to update all users 
   // then i need to create a random user and update each part of the user once
})

Cypress.Commands.add('generateUpdateRandomData',() => {

    var gender = ['male', 'female'];
    var status = ['active', 'inactive'];
    const faker = require('faker');

    cy.writeFile('cypress/fixtures/UpdateUser/updatingEachPart.json', {
        'onlyName':{
            'name': `${faker.name.findName()}`
        },
        'onlyGender':{
            'gender': `${faker.random.arrayElement(gender)}`,
        },
        'onlyEmail':{
            'email': `${faker.internet.email()}`
        },
        'onlyStatus':{
            'status': `${faker.random.arrayElement(status)}`
        }

    })
})