describe('Blog app', function() {
    
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', { username: 'SauNii', name: 'Sauli', password: 'passu' })
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

    describe('Login',function() {
        
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('SauNii')
            cy.get('#password').type('passu')
            cy.get('#login').click()

            cy.contains('Login success')
            cy.contains('Sauli logged in')
            cy.contains('blogs')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('Sauli')
            cy.get('#password').type('passu')
            cy.get('#login').click()

            cy.contains('invalid username or password')
            cy.contains('Log in to application')
            cy.get('#username').should('be.visible') 
            cy.get('#password').should('be.visible')
            cy.get('#login').contains('login').should('be.visible')
        })
    })

    describe('When logged in', function() {

        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/login', { username: 'SauNii', password: 'passu' })
                .then(response => { 
                    localStorage.setItem('loggedUser', JSON.stringify(response.body))
                    cy.visit('http://localhost:3000')
                })
        })
    
        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Pressan blogi')
            cy.get('#author').type('Sale')
            cy.get('#url').type('pressa.fi')
            cy.get('#create').click()

            cy.contains('a new blog Pressan blogi by Sale added')
            cy.contains('Pressan blogi Sale')
        })
      })
})