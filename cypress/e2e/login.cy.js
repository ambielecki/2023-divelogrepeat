describe('E2E Login', () => {
    it('logs_in', () => {
        cy.visit('/');
        cy.get('[data-test="log_in"]').first().click();
        cy.contains('[data-test="login_header"]', 'Login');
        cy.get('[name="email"]').first().type(Cypress.env('test_user_email'));
        cy.get('[name="password"]').first().type(Cypress.env('test_user_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.location('pathname').should('eq', '/');
        cy.get('[data-test="log"]').should('exist');
        cy.get('[data-test="log_in"]').should('not.exist');
    });
})