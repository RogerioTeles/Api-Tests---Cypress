/// <reference types="Cypress"/>
let user = {}
var userId;

describe('Given the User API', () => {

    before(() => {
        //cy.generateRandomUser();
        cy.generateRandomData('post');
        cy.fixture('PostUser/PostData').then((User) => {
            user = User;
        })
    });

    context('When I send POST /User with all fields ', () => {
        
        after(() => {
            cy.deleteUser(userId);
        })
        
        it('Then it should create a new user', () => {
            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.AllUser
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(201)
                expect(response.body.data).has.property('name', user.AllUser.name)
                expect(response.body.data).has.property('gender', user.AllUser.gender)
                expect(response.body.data).has.property('email', user.AllUser.email)
                expect(response.body.data).has.property('status', user.AllUser.status)
                userId = response.body.data.id;
            })
        });
    })

    context('When I send POST /User sending only one field ', () => {
        it('(Name) - Then it should return a message informing that EMAIL, GENDER AND STATUS cannot be blank', () => {
            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.name,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).be.eq(422);
                expect(response.body.data[0].message).be.eq("can't be blank")
                expect(response.body.data[0].field).be.eq("email")
                expect(response.body.data[1].message).be.eq("can't be blank")
                expect(response.body.data[1].field).be.eq("gender")
                expect(response.body.data[2].message).be.eq("can't be blank")
                expect(response.body.data[2].field).be.eq("status")

            })
        });

        it('(Email) - Then it should return a message informing that NAME, GENDER AND STATUS cannot be blank', () => {
            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.email,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).be.eq(422);
                expect(response.body.data[0].message).be.eq("can't be blank")
                expect(response.body.data[0].field).be.eq("name")
                expect(response.body.data[1].message).be.eq("can't be blank")
                expect(response.body.data[1].field).be.eq("gender")
                expect(response.body.data[2].message).be.eq("can't be blank")
                expect(response.body.data[2].field).be.eq("status")

            })
        });

        it('(Gender) - Then it should return a message informing that NAME, EMAIL AND STATUS cannot be blank', () => {
            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.gender,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).be.eq(422);
                expect(response.body.data[0].message).be.eq("can't be blank")
                expect(response.body.data[0].field).be.eq("email")
                expect(response.body.data[1].message).be.eq("can't be blank")
                expect(response.body.data[1].field).be.eq("name")
                expect(response.body.data[2].message).be.eq("can't be blank")
                expect(response.body.data[2].field).be.eq("status")
            })
        });

        it('(Status) - Then it should return a message informing that NAME, EMAIL AND STATUS cannot be blank', () => {
            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.status,
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

            })
        });
    })

    context('When I send POST /User with null fields', () => {
        it('Then it should return me an error 422 informing that each field must be not null', () => {
            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.nullValues,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
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

    context("When i sent null values in each field", () => {
        it.only("Then it shoud return me an error where shows that the fields i sent could not be null - Name", () => {

            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.nullName,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
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

        it.only("Then it shoud return me an error where shows that the fields i sent could not be null - Email", () => {

            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.nullEmail,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
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

        it.only("Then it shoud return me an error where shows that the fields i sent could not be null - Gender", () => {

            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.nullGender,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
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
        
        it.only("Then it shoud return me an error where shows that the fields i sent could not be null - Status", () => {

            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('accessToken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: user.nullStatus,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
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
    });

    context('When I send POST /User without accessToken', () => {
        it('Then it should return an auth error', () => {
            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(401);
                expect(response.body.data.message).to.eq('Authentication failed')
            })
        });
    })
})