describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Atte Jokinen',
      username: 'Mie',
      password: 'String'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Login')
  })
})

describe('Login', function() {

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('Mie')
    cy.get('#password').type('String')
    cy.get('#login-button').click()

    cy.contains('Atte Jokinen logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('Väärä')
    cy.get('#password').type('Väärä')
    cy.get('#login-button').click()

    cy.contains('Login')
  })
})

describe('Blog app', function() {
  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Atte Jokinen',
        username: 'Mie',
        password: 'String'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.get('#username').type('Mie')
      cy.get('#password').type('String')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('Test created by Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type(':D')
      cy.get('#submit').click()
    })

    it('A blog can be liked', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('Test created by Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type(':D')
      cy.get('#submit').click()
      cy.get('#view').click()
      cy.get('#like').click()
    })
  })
})