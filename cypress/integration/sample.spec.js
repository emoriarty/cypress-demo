/// <reference types="cypress" />

const names = ['alpha', 'beta', 'gamma', 'delta', 'epsilon']
const values = ['α', 'β', 'γ', 'δ', 'ε']

describe('Demo form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  context('everything is in place', () => {
    it('contains 5 checkboxes and submit button', () => {
      // https://on.cypress.io/type
      cy.get('.switch')
        .should('have.length', 5)

      cy.get('button[type=submit]')
        .should('have.length', 1)
    })

    it('form values are properly set', () => {
      cy.get('.labelSwitch').each((label, idx) => {
        expect(label).contains(new RegExp(names[idx], 'i'))
      })

      cy.get('.switch > input').each((input, idx) => {
        expect(input).have.prop('name', names[idx])
        expect(input).have.value(values[idx])
      })
    })
  })

  context('submitting', () => {
    it('all checkboxes', () => {
      cy.captureAlert().then(stubAlert => {
        cy.get('.switch')
          .click({ multiple: true })

        cy.get('[type=submit]').click()
          .then(() => {
           const regexStr = values.reduce((acc, val) => {
             acc += `(?=.*${val}).*`
             return acc
           }, '')
            expect(stubAlert.getCall(0)).contains(new RegExp(regexStr, 'i'))
          })
      })
    })

    it('specific checkboxes', () => {
      cy.captureAlert().then(stubAlert => {
        cy.get('form > :nth-child(2)').click()
        cy.get('form > :nth-child(5)').click()

        cy.get('[type=submit]').click()
          .then(() => {
            expect(stubAlert.getCall(0)).contains(/(?=.*β).*(?=.*ε)/i)
            expect(stubAlert.getCall(0)).not.contains(/α|γ|δ/i)
          })
      })
    })
  })

})

Cypress.Commands.add('captureAlert', () => {
  const stub = cy.stub()  
  cy.on ('window:alert', stub)
  return stub
})
