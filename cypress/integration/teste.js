/// <reference types="Cypress"/>

before(() => {
    cy.visit('https://app-qa-reports2.ploomes.dev/');
});

describe('teste1', () => {
    context('aaa', () => {
        it('teste', () => {
            cy.get('#email').type('rogerio.teles@ploomes.com');
            cy.get('#password').type('Svra99roos!');
            cy.get('[class="sc-efQSVx sc-cTAqQK kdrjec kuxwRO ds-button-container f-1 fd-row ai-center jc-start"]').click();
            cy.intercept('GET','https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true').as('teste');
           // cy.wait(cy.get('[data-icon="graduation-cap"]').should('be visible'))
        })
    })

})