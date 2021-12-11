Cypress.Commands.add('generateUser', () => {

    var teste = ['male', 'female'];
    var status = ['active', 'inactive'];

    const faker = require('faker')

    cy.writeFile('cypress/fixtures/randomUser.json', {
            'name': `${faker.name.findName()}`,
            'gender': `${faker.random.arrayElement(teste)}`,
            'email': `${faker.internet.email()}`,
            'status': `${faker.random.arrayElement(status)}`
        }
    )
})

