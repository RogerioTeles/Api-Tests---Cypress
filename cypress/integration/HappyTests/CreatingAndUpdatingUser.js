/// <reference types="Cypress"/>
let accessToken = Cypress.env('accessToken');

describe("Creating an user, updating it and seeing if it was really updated", () => {
    var userId;
    before(() => {
        cy.generateUser()
    })

    it("Creating random user and saving his UserId", () => {
        cy.fixture('randomUser').then(randomUser => {
            cy.request({
                method: 'post',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: randomUser
            }).then((res) => {
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data).has.property('name', randomUser.name)
                expect(res.body.data).has.property('gender', randomUser.gender)
                expect(res.body.data).has.property('email', randomUser.email)
                expect(res.body.data).has.property('status', randomUser.status)
                userId = res.body.data.id;
            })
        })
    })

    it("Validating if the id returned can leave us to our user previously saved", () => {

        cy.fixture('randomUser').then(randomUser => {
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                cy.log(JSON.stringify(res));
                expect(res.body.data).has.property('id', userId);
                expect(res.body.data).has.property('name', randomUser.name)
                expect(res.body.data).has.property('gender', randomUser.gender)
                expect(res.body.data).has.property('email', randomUser.email)
                expect(res.body.data).has.property('status', randomUser.status)
            })
        })
    })

    it("Updating all fields from user", () => {

    })

    it("Checking - Updating all fields from user", () => {

    })

    it("Updating only the name", () => {

    })

    it("Cheking -Updating only the name", () => {

    })

    it("Updating only the gender", () => {})

    it("Checking - Updating only the gender", () => {})


})