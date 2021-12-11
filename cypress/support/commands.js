Cypress.Commands.add('savingGetUser', (id, name, email, gender, status) => {
    cy.writeFile('cypress/fixtures/GetUser/randomUserFromGET.json', {
        'id': id,
        'name': name,
        'email': email,
        'gender': gender,
        'status': status
    })
})

Cypress.Commands.add('savingPostUserToDelete', (id, name, email, gender, status) => {
    cy.writeFile('cypress/fixtures/DeleteUser/userToDelete.json', {
        'id': id,
        'name': name,
        'email': email,
        'gender': gender,
        'status': status
    })
})

Cypress.Commands.add('generateRandomUser', () => {

    var teste = ['male', 'female'];
    var status = ['active', 'inactive'];

    const faker = require('faker')

    cy.writeFile('cypress/fixtures/randomUser.json', {
        'name': `${faker.name.findName()}`,
        'gender': `${faker.random.arrayElement(teste)}`,
        'email': `${faker.internet.email()}`,
        'status': `${faker.random.arrayElement(status)}`
    })
})

Cypress.Commands.add('savingRandomUser', () => {
    cy.generateRandomUser()

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
            cy.savingPostUserToDelete(user.id, user.name, user.email, user.gender, user.status);
        })
    });
})