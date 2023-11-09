import Register from "../../objects/Register";

const registerExistingAcctSpec = () => {
  const registrationObj = new Register();
  registrationObj.init().fillForm("existingAcct").submitForm();
  cy.get('[data-test="register-error"]')
    .should("be.visible")
    .and("have.text", "A customer with this email address already exists.");
};

export default registerExistingAcctSpec;
