/// <reference types="Cypress"/>

before(()=>{
    cy.savingRandomUser('update')
    
})

describe('Given User API',()=>{
    context('When I already have an user and want to update it all',()=>{
        it('Then it must have to return me ...', () => {
            var UserId;
            cy.fixture('UpdateUser/userToBeUpdated').then(user =>{
                UserId = user.id;
                //cy.randomUserForUpdate();
            })

            
            
        });
    })
})
