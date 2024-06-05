function generateUniqueEmail() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  return `testuser${hour}${minute}@example.com`; 
}

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.registerDiv').click();


 cy.get('.inputone').type(generateUniqueEmail());


 cy.get('.inputtwo').type('Paczka1');


 cy.get('.buttonregister').click();


 cy.url().should('include', '/logowanie');

 cy.get('.loginone').type(generateUniqueEmail());


 cy.get('.logintwo').type('Paczka1');


  cy.get('.buttonLogin').click();


  })
})