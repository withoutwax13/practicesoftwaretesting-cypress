import Login from "../../objects/Login";

const loginInvalidCreds = () => {
  const loginObj = new Login();
  loginObj.init().fillForm("invalid").submitForm();
  cy.get('[data-test="login-error"]')
    .should("be.visible")
    .contains("Invalid email or password");
};

export default loginInvalidCreds;
