/// <reference types="Cypress"/>
let accessToken = Cypress.env('accessToken');

describe("Creating random user and deleting it", () => {

    var userId;
    before(() => {
        cy.generateUser()
    });

    it("Creating random user", () => {
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

    it("Deleting the user that was previously created", () => {

        cy.request({
            method: 'delete',
            url: 'https://gorest.co.in/public/v1/users/' + userId,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            expect(res.status).to.eq(204);
            cy.log(JSON.stringify(res));
            expect(res.body.data).to.eq(undefined);
        })
    })

    it("Checking if the user was deleted",()=>{

        cy.fixture('randomUser').then(randomUser => {
            cy.request({
                method: 'GET',
                failOnStatusCode: false,
                url: 'https://gorest.co.in/public/v1/users/'+userId,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                cy.log(JSON.stringify(res));
                expect(res.status).to.eq(404);
                expect(res.body.data).has.property("message","Resource not found");
            })
        })
    })

})