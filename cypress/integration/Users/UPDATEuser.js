/// <reference types="Cypress"/>


//Tá gerando muito dado desorganizado e muitas vezes, preciso organizar certinho e desenhar pra ver como que vai salvar
// cada coisa somente uma vez para eu poder validar e tudo mais.
before(() => {
    cy.savingRandomUser('update');
    cy.generateUpdateRandomUser();
    cy.generateUpdateRandomData();
})

describe('Given User API', () => {
    context('When I already have an user and want to update it all', () => {
        it('Then it must have to return me 200 and the updated user s information with the same ID i sent de request.', () => {
            cy.fixture('UpdateUser/userToBeUpdated').then((randomUser) => {
                cy.fixture('UpdateUser/updatingAllUser').then((newUser) => {
                    cy.request({
                        method: 'patch',
                        url: 'https://gorest.co.in/public/v1/users/' + randomUser.id,
                        headers: {
                            'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: newUser
                    }).then((response) => {
                        cy.log(JSON.stringify(response.body));
                        expect(response.status).to.eq(200);
                        expect(response.body.data.id).to.eq(randomUser.id);
                        expect(response.body.data.name).to.eq(newUser.name);
                        expect(response.body.data.gender).to.eq(newUser.gender);
                        expect(response.body.data.email).to.eq(newUser.email);
                        expect(response.body.data.status).to.eq(newUser.status);

                    })
                })
            })
        });
    })
    context('When im wanting to change only one thing from user', () => {
        it('Then it should return the user with only one change - name', () => {
            cy.fixture('UpdateUser/userToBeUpdated').then((UserToBeUpdated) => {
                cy.fixture('UpdateUser/updatingEachPart').then((newData) => {
                    cy.request({
                        method: 'patch',
                        url: 'https://gorest.co.in/public/v1/users/' + UserToBeUpdated.id,
                        headers: {
                            'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: newData.onlyName
                    }).then((response) => {
                        cy.log(JSON.stringify(response.body));
                        expect(response.status).to.eq(200);
                        expect(response.body.data.id).to.eq(UserToBeUpdated.id);
                        expect(response.body.data.name).to.eq(newData.onlyName.name);
                        cy.fixture('UpdateUser/updatingAllUser').then(oldUser=>{
                            expect(response.body.data.gender).to.eq(oldUser.gender);
                            expect(response.body.data.email).to.eq(oldUser.email);
                            expect(response.body.data.status).to.eq(oldUser.status);
                        })

                    })
                })
            })
        })  
    })


});