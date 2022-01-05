
Cypress.Commands.add('savingGetUser', (id, name, email, gender, status) => {
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


Cypress.Commands.add('generateRandomData',(metodo) => {

    var path;
    if(metodo == 'update'){
        path = 'cypress/fixtures/UpdateUser/updatingEachPart.json'
    }else if(metodo == 'post'){
        path = 'cypress/fixtures/PostUser/PostData.json'
    }
    var gender = ['male', 'female'];
    var status = ['active', 'inactive'];
    const faker = require('faker');

    cy.writeFile(path, {
        'name':{
            'name': `${faker.name.findName()}`
        },
        'gender':{
            'gender': `${faker.random.arrayElement(gender)}`,
        },
        'email':{
            'email': `${faker.internet.email()}`
        },
        'status':{
            'status': `${faker.random.arrayElement(status)}`
        },
        'AllUser':{
            'name': `${faker.name.findName()}`,
            'gender': `${faker.random.arrayElement(gender)}`,
            'email': `${faker.internet.email()}`,
            'status': `${faker.random.arrayElement(status)}`
        },
        'nullValues':{
            'name': null,
            'gender':null,
            'email':null,
            'status':null
        },
        'nullName':{
            'name':null
        },
        'nullGender':{
            'gender': null
        },
        'nullEmail':{
            'email': null
        },
        'nullStatus':{
            'status': null
        },
    })
})


Cypress.Commands.add('deleteUser',(userId)=>{
        cy.request({
            method: 'delete',
            url: 'https://gorest.co.in/public/v1/users/' + userId,
            headers: {
                'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
});