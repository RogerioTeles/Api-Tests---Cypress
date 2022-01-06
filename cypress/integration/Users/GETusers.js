/// <reference types="Cypress"/>

describe('Given the Users api', () => {
    context('When I Send Get /users', () => {
        it('Then it should return a list with 20 registered users', () => {
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users/',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.meta.pagination.limit).to.eq(response.body.data.length);
                Cypress._.each(response.body.data, (users) => {
                    expect(users).to.have.all.keys('id', 'name', 'email', 'gender', 'status');
                    expect(users.id).to.be.a('number').and.not.be.null;
                    expect(users.email).to.not.be.null;
                    expect(users.gender).to.not.be.null;
                    expect(users.status).to.not.be.null;
                })
                var usuario = response.body.data[0];
                cy.savingGetUser(usuario.id, usuario.name, usuario.email, usuario.gender, usuario.status);
            })
        });
    });

    context('When i send GET /users passing user id as an URL param', () => {
        it('Then it should return only the filtered user', () => {
            let user = {}

            cy.readFile('cypress/fixtures/GetUser/randomUserFromGET.json').then((User) => {
                user = User;

                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v1/users/' + user.id,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(JSON.stringify(response.body));
                    expect(response.body.data).to.have.all.keys('id', 'name', 'email', 'gender', 'status');
                    expect(response.body.data).has.property('id', user.id);
                    expect(response.body.data).has.property('name', user.name)
                    expect(response.body.data).has.property('gender', user.gender)
                    expect(response.body.data).has.property('email', user.email)
                    expect(response.body.data).has.property('status', user.status)
                })
            })
        })
    });

    context('When i send GET /user passing an userid that doesnt exists as an URL Param', () => {
        it('Then it should return an message informing that the user was not found', () => {
            cy.request({
                method: 'get',
                url: 'https://gorest.co.in/public/v1/users/0000',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response)=>{
                expect(response.status).to.eq(404);
                cy.log(JSON.stringify(response.body))
                expect(response.body.data.message).to.eq('Resource not found')
            })
        });
    })
})