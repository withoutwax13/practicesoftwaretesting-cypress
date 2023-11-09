import Checkout from "../../objects/Checkout";

const registeredUserCheckout = () => {
  cy.intercept(
    "POST",
    "https://api.practicesoftwaretesting.com/payment/check"
  ).as("paymentCheck");
  const checkoutObj = new Checkout();
  cy.validLogin();
  cy.quickBuyProduct();
  checkoutObj.init();
  cy.fixture("selectors.json").then((selectors) => {
    cy.get(selectors.pages.checkout.nextStepOne).click();
    cy.get(selectors.pages.checkout.stepperIndicator)
      .find("li")
      .eq(1)
      .should("have.class", "current");
    cy.get(selectors.pages.checkout.nextStepTwo).click();
    cy.get(selectors.pages.checkout.nextStepThree).click();
    cy.get(selectors.pages.checkout.paymentOption).select("Bank Transfer");
    cy.get(selectors.pages.checkout.accountName).type(
      Cypress.env("data").checkout.accountName
    );
    cy.get(selectors.pages.checkout.accountNumber).type(
      Cypress.env("data").checkout.accountNumber
    );
    cy.get('[data-test="finish"]').click();
    cy.get(".help-block")
      .should("be.visible")
      .contains("Payment was successful");
    cy.wait("@paymentCheck").its("response.statusCode").should("eq", 200);
  });
};

export default registeredUserCheckout;
