/// <reference types="Cypress"/>

let user = {}
before(() => {
    cy.fixture('GetUser/randomUserFromGET').then(User => {
        user = User;
    })
});
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
            }).then((res) => {
                cy.log(JSON.stringify(res.body));
                expect(res.status).to.eq(200);
                expect(res.body.meta.pagination.limit).to.eq(res.body.data.length);
                Cypress._.each(res.body.data, (users) => {
                    expect(user).to.have.all.keys('id', 'name', 'email', 'gender', 'status');
                    expect(users.id).to.be.a('number').and.not.be.null;
                    expect(users.email).to.not.be.null;
                    expect(users.gender).to.not.be.null;
                    expect(users.status).to.not.be.null;
                })
                var usuario = res.body.data[0];
                cy.savingGetUser(usuario.id, usuario.name, usuario.email, usuario.gender, usuario.status);
                //expect(res.body.data[0].email).to.not.be.null;
            })
        });
    });

    context('When i send GET /users passing user id as an URL param', () => {
        it('Then it should return only the filtered user', () => {

                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v1/users/' + user.id,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    expect(res.status).to.eq(200);
                    cy.log(JSON.stringify(res.body));
                    expect(res.body.data).to.have.all.keys('id', 'name', 'email', 'gender', 'status');
                    expect(res.body.data).has.property('id', user.id);
                    expect(res.body.data).has.property('name', user.name)
                    expect(res.body.data).has.property('gender', user.gender)
                    expect(res.body.data).has.property('email', user.email)
                    expect(res.body.data).has.property('status', user.status)
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
            }).then((res)=>{
                expect(res.status).to.eq(404);
                cy.log(JSON.stringify(res.body))
                expect(res.body.data.message).to.eq('Resource not found')
            })
        });
    })
})