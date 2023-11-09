import Login from "../../objects/Login";

const loginInvalidEmailFormat = () => {
  const dataSet = Cypress.env("data").login.invalidEmailFormat;
  dataSet.forEach((data) => {
    const loginObj = new Login({ invalidEmailFormat: data });
    loginObj.init().fillForm("invalidEmailFormat").submitForm();
    cy.get('[data-test="email-error"]')
      .should("be.visible")
      .contains("E-mail format is invalid.");
  });
};

export default loginInvalidEmailFormat;
