Cypress.Commands.add('savingGetUser', (id,name,email,gender,status) => {
    cy.writeFile('cypress/fixtures/GetUser/randomUserFromGET.json', {
            'id': id,
            'name': name,
            'email':email,
            'gender': gender,
            'status': status
        }
    )
})
