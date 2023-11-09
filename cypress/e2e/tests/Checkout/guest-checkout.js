import Checkout from "../../objects/Checkout";

const guestCheckout = () => {
    const checkoutObj = new Checkout();
    cy.quickBuyProduct();
    checkoutObj.init();
    cy.fixture("selectors.json").then((selectors) => {
        cy.get(selectors.pages.checkout.nextStepOne).click();
        cy.get(selectors.pages.checkout.stepperIndicator)
        .find("li")
        .eq(1)
        .should("have.class", "current");
        cy.get("h3").contains("Customer login").should("be.visible");
    });
};

export default guestCheckout;