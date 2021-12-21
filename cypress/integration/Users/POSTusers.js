/// <reference types="Cypress"/>
let randomUser = {}
beforeEach(() => {
    cy.generateRandomUser();
    cy.fixture('randomUser').then(user => {
        randomUser = user;
    })
})


describe('Given the User API', () => {
    context('When I send POST /User', () => {
        it('Then it should create a new user', () => {

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
                    cy.log(JSON.stringify(res.body))
                    expect(res.status).to.eq(201)
                    expect(res.body.data).has.property('name', randomUser.name)
                    expect(res.body.data).has.property('gender', randomUser.gender)
                    expect(res.body.data).has.property('email', randomUser.email)
                    expect(res.body.data).has.property('status', randomUser.status)
                    //userId = res.body.data.id;
                })
        });
    })

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
                    //Preciso declarar isso para que não pare o teste caso dê erro
                    failOnStatusCode: false
                }).then((res)=>{
                    cy.log(JSON.stringify(res.body))
                    expect(res.status).to.eq(401);
                    expect(res.body.data.message).to.eq('Authentication failed')
                })
        });
    })
})