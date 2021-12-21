/// <reference types="Cypress"/>
let userToBeUpdated = {};
let newUser = {};

describe.only('Given User API', () => {
    before(() => {
        cy.savingRandomUser('update');
        //cy.generateUpdateRandomUser();
        cy.generateUpdateRandomData();
        cy.fixture('UpdateUser/userToBeUpdated').then((UserToBeUpdated) => {
            userToBeUpdated = UserToBeUpdated;
        })
        cy.fixture('UpdateUser/updatingEachPart').then((NewUser) => {
            newUser = NewUser;
        })

        
    })
    context('When I already have an user and want to update it all', () => {

        it('Then it must have to return me 200 and the updated user s information with the same ID i sent de request.', () => {

            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.AllUser
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.data.id).to.eq(userToBeUpdated.id);
                expect(response.body.data.name).to.eq(newUser.AllUser.name);
                expect(response.body.data.gender).to.eq(newUser.AllUser.gender);
                expect(response.body.data.email).to.eq(newUser.AllUser.email);
                expect(response.body.data.status).to.eq(newUser.AllUser.status);
                var user = response.body.data;
                cy.savingPostUser(userToBeUpdated.id, user.name, user.email, user.gender, user.status, 'update');
            })
        });
    })
    context('When im wanting to change only one thing from user', () => {
        it('Then it should return the user with only one change', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: updatignEachPartName
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.data.id).to.eq(userToBeUpdated.id);
                expect(response.body.data.name).to.eq(updatignEachPartName.name);
                expect(response.body.data.gender).to.eq(updatingAllUser.gender);
                expect(response.body.data.email).to.eq(updatingAllUser.email);
                expect(response.body.data.status).to.eq(updatingAllUser.status);
            })
        })
    })


});