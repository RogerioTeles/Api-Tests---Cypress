/// <reference types="Cypress"/>
let userToBeUpdated = {};
let newUser = {};

before(() => {
    cy.savingRandomUser('update');
    cy.generateRandomData('update');
    cy.fixture('UpdateUser/updatingEachPart').then((NewUser) => {
        newUser = NewUser;
    })
})
describe('Given User API', () => {

    beforeEach(() => {
        //Here i need to use readfile 'couse i am changing de data from this fixture but the
        //command cy.fixture isnt bring me the updated data, just the old ones, according to this site https://github.com/cypress-io/cypress/issues/4716
        // it happens because cy.fixture uses data in cache, otherwise cy.readfile pick the file at the time it was called.
        cy.readFile('cypress/fixtures/UpdateUser/userToBeUpdated.json').then((UserToBeUpdated) => {
            userToBeUpdated = UserToBeUpdated;
        })
    });

    after(() => {
        cy.deleteUser(userToBeUpdated.id);
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
    context('When i want to change only one thing from user', () => {
        it('Then it should return the user with only one change - Name', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.name
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.data.id).to.eq(userToBeUpdated.id);
                expect(response.body.data.name).to.eq(newUser.name.name);
                expect(response.body.data.gender).to.eq(userToBeUpdated.gender);
                expect(response.body.data.email).to.eq(userToBeUpdated.email);
                expect(response.body.data.status).to.eq(userToBeUpdated.status);
                var user = response.body.data;
                cy.savingPostUser(userToBeUpdated.id, user.name, user.email, user.gender, user.status, 'update');
            })
        })

        it('Then it should return the user with only one change - Gender', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.gender
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.data.id).to.eq(userToBeUpdated.id);
                expect(response.body.data.name).to.eq(userToBeUpdated.name);
                expect(response.body.data.gender).to.eq(newUser.gender.gender);
                expect(response.body.data.email).to.eq(userToBeUpdated.email);
                expect(response.body.data.status).to.eq(userToBeUpdated.status);
                var user = response.body.data;
                cy.savingPostUser(userToBeUpdated.id, user.name, user.email, user.gender, user.status, 'update');
            })
        })

        it('Then it should return the user with only one change - Email', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.email
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.data.id).to.eq(userToBeUpdated.id);
                expect(response.body.data.name).to.eq(userToBeUpdated.name);
                expect(response.body.data.gender).to.eq(userToBeUpdated.gender);
                expect(response.body.data.email).to.eq(newUser.email.email);
                expect(response.body.data.status).to.eq(userToBeUpdated.status);
                var user = response.body.data;
                cy.savingPostUser(userToBeUpdated.id, user.name, user.email, user.gender, user.status, 'update');
            })
        })

        it('Then it should return the user with only one change - Status', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.status
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.data.id).to.eq(userToBeUpdated.id);
                expect(response.body.data.name).to.eq(userToBeUpdated.name);
                expect(response.body.data.gender).to.eq(userToBeUpdated.gender);
                expect(response.body.data.email).to.eq(userToBeUpdated.email);
                expect(response.body.data.status).to.eq(newUser.status.status);
                var user = response.body.data;
                cy.savingPostUser(userToBeUpdated.id, user.name, user.email, user.gender, user.status, 'update');
            })
        })
    })

    context('When i send only null values', () => {
        it('Then it should return me an error informing that all fields i sent could not be null', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.nullValues,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).be.eq(422);
                expect(response.body.data[0].message).be.eq("can't be blank")
                expect(response.body.data[0].field).be.eq("email")
                expect(response.body.data[1].message).be.eq("can't be blank")
                expect(response.body.data[1].field).be.eq("name")
                expect(response.body.data[2].message).be.eq("can't be blank")
                expect(response.body.data[2].field).be.eq("gender")
                expect(response.body.data[3].message).be.eq("can't be blank")
                expect(response.body.data[3].field).be.eq("status")
            })
        });
    })

    context('When i sent null values in each field', () => {
        it('Then it shoud return me an error where shows that the field i sent could not be null - Name', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.nullName,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).be.eq(422);
                expect(response.body.data[0].message).be.eq("can't be blank")
                expect(response.body.data[0].field).be.eq("name")
            })
        });

        it('Then it shoud return me an error where shows that the field i sent could not be null - Email', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.nullEmail,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).be.eq(422);
                expect(response.body.data[0].message).be.eq("can't be blank")
                expect(response.body.data[0].field).be.eq("email")
            })
        });

        it('Then it shoud return me an error where shows that the field i sent could not be null - Gender', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.nullGender,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).be.eq(422);
                expect(response.body.data[0].message).be.eq("can't be blank")
                expect(response.body.data[0].field).be.eq("gender")
            })
        });

        it('Then it shoud return me an error where shows that the field i sent could not be null - Status', () => {
            cy.request({
                method: 'patch',
                url: 'https://gorest.co.in/public/v1/users/' + userToBeUpdated.id,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newUser.nullStatus,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).be.eq(422);
                expect(response.body.data[0].message).be.eq("can't be blank")
                expect(response.body.data[0].field).be.eq("status")
            })
        });
    })
});