describe('template spec', () => {
  it('visits_home_page_as_guest', () => {
    cy.visit('/');
    cy.contains('[data-test="navbar-home"]', 'DiveLogRepeat');
    cy.contains('[data-test="blog"]', 'Blog');
    cy.contains('[data-test="calculator"]', 'Calculator');
    cy.get('[data-test="log"]').should('not.exist');
    cy.get('[data-test="admin"]').should('not.exist');
  })
})