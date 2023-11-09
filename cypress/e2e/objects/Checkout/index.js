class Checkout {
  constructor(data = null) {
    this.data = data || Cypress.env("data").checkout;
    this.keyScenario = "valid";
  }

  init = () => {
    cy.visit("#/checkout");
    cy.url().should("include", "#/checkout");
    return this;
  };
}

export default Checkout;
