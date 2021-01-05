describe('Sample test', () => {
    beforeEach('Visit Emoji search', () => {
        cy.visit('/')
    })
    it('Search for lollipop emoji', () => {
        cy.get('input').type('lollipop')
        cy.get('.component-emoji-result-row').should('have.length', 1)
        cy.contains('Lollipop').should('have.class', 'title')
    })
    it('Search for Wolf emoji', () => {
        cy.get('input').type('wolf')
        cy.get('.component-emoji-result-row').should('have.length', 1)
        cy.contains('Wolf').should('have.class', 'title')
    })
    afterEach('Search lollipop emoji', () => {
        cy.get('input').clear()
        cy.get('input').should('have.value', '')
    })
})