describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.get('h2').contains('Log in to application')
        cy.get('form').contains('username')
        cy.get('form').contains('password')
        cy.get('#username').should('be.visible') 
        cy.get('#password').should('be.visible')
        cy.get('#login').contains('login').should('be.visible')
    })
})