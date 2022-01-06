/// <reference types="Cypress"/>
let userToDelete = {};
before(() => {
    cy.savingRandomUser('delete');
    cy.fixture('DeleteUser/userToDelete').then(user => {
        userToDelete = user;
    })
});

describe('Given User API', () => {
    context('When I send DELETE /user passing an userID as an URL param', () => {
        it('Then the user should be deleted from the API', () => {
        
                cy.request({
                    method: 'delete',
                    url: 'https://gorest.co.in/public/v1/users/' + userToDelete.id,
                    headers: {
                        'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    expect(response.status).to.eq(204);
                    cy.log(JSON.stringify(response.body));
                    expect(response.body.data).to.eq(undefined);
                })
        })
    });
    context('When I send DELETE /user without access token', () => {
        it('Then it should return an auth error', () => {
            var accessToken = '';

                cy.request({
                    method: 'delete',
                    url: 'https://gorest.co.in/public/v1/users/' + userToDelete.id,
                    headers: {
                        'Authorization': 'Bearer ',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    cy.log(JSON.stringify(response.body))
                    expect(response.status).to.eq(404);
                    expect(response.body.data.message).to.eq('Resource not found')
                })
        });
    });
    context('When I send DELETE /user passing an userID that doesnt exist or was already deleted as an URL param', () => {
        it('Then it should return an message informing that the user was not found', () => {
                cy.request({
                    method: 'delete',
                    url: 'https://gorest.co.in/public/v1/users/' + userToDelete.id,
                    headers: {
                        'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.eq(404);
                    expect(response.body.data.message).to.eq('Resource not found')
                })
        });
    })
})