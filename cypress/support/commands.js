// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("quickBuyProduct", () => {
  cy.intercept("GET", "https://api.practicesoftwaretesting.com/products/**").as(
    "productClicked"
  );
  cy.intercept("POST", "https://api.practicesoftwaretesting.com/carts/**").as(
    "succesfullyAddedToCart"
  );
  cy.visit("#");
  cy.get(".card").first().click();
  cy.wait("@productClicked").its("response.statusCode").should("eq", 200);
  cy.url().should("include", "#/product");
  cy.get("button[data-test*='add-to-cart']").click();
  cy.wait("@succesfullyAddedToCart")
    .its("response.statusCode")
    .should("eq", 201);
});

Cypress.Commands.add("validLogin", () => {
  const data = Cypress.env("data").login;
  cy.visit("#/auth/login");
  cy.url().should("include", "/auth/login");
  cy.fixture("selectors.json").then((selectors) => {
    const loginSelectors = selectors.pages.login;
    cy.get(loginSelectors.emailGroup).find("input").clear();
    cy.get(loginSelectors.emailGroup).type(data.valid.email);
    cy.get(loginSelectors.passwordGroup).find("input").clear();
    cy.get(loginSelectors.passwordGroup).type(data.valid.password);
  });
  cy.intercept(
    "POST",
    "https://api.practicesoftwaretesting.com/users/login"
  ).as("succesfulLogin");
  cy.fixture("selectors.json").then((selectors) => {
    cy.get(selectors.pages.login.loginButton).click();
  });
  cy.url().should("include", "#/account");
});
