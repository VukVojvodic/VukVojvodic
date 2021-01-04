describe('Simple tests', () => {
    it('Using query commands', () => {
        cy.visit('https://example.cypress.io/commands/querying');
        cy.get('#query-btn').should('contain', 'Button')
    });
    it('Should type into fields', () => {
        cy.visit('https://example.cypress.io/commands/actions');
        cy.get('.action-email')
            .type('vuk@fathomtech.com').should('have.value', 'vuk@fathomtech.com')
    });
    it('Should click on action button', () => {
        cy.visit('https://example.cypress.io/commands/actions');
        cy.get('.action-btn').click()
    });
    it('Submit form', () => {
        cy.get('.action-form')
        .find('[type="text"]').type('I LOVE Cypress')
        cy.get('.action-form').submit()
          .next().should('contain', 'Your form has been submitted!')
      });
});