import { faker } from "@faker-js/faker";

class Register {
  constructor(data = null) {
    this.data = data || Cypress.env("data").registration;
    this.isValidForSubmission = false;
    this.keyScenario = "valid";
  }

  init = () => {
    cy.visit("#/auth/register");
    cy.url().should("include", "/auth/register");
    // verify if all elements are present on the page
    cy.fixture("selectors.json").then((selectors) => {
      Object.keys(selectors.pages.registration).forEach((key) => {
        cy.get(selectors.pages.registration[key])
          .should("be.visible")
          .and("exist");
      });
    });
    return this;
  };

  fillForm = (key = "") => {
    this.keyScenario = key || "valid";
    switch (key) {
      case "":
        cy.fixture("selectors.json").then((selectors) => {
          cy.get(selectors.pages.registration.firstNameGroup)
            .find("input")
            .type(this.data.valid.firstName);
          cy.get(selectors.pages.registration.lastNameGroup)
            .find("input")
            .type(this.data.valid.lastName);
          cy.get(selectors.pages.registration.dateOfBirthGroup)
            .find("input")
            .type(
              `${this.data.valid.dateOfBirth.yyyy}-${this.data.valid.dateOfBirth.mm}-${this.data.valid.dateOfBirth.dd}`
            );
          cy.get(selectors.pages.registration.addressGroup)
            .find("input")
            .type(this.data.valid.address);
          cy.get(selectors.pages.registration.postCodeGroup)
            .find("input")
            .type(this.data.valid.postCode);
          cy.get(selectors.pages.registration.cityGroup)
            .find("input")
            .type(this.data.valid.city);
          cy.get(selectors.pages.registration.stateGroup)
            .find("input")
            .type(this.data.valid.state);
          cy.get(selectors.pages.registration.countryGroup)
            .find("select")
            .select(this.data.valid.country, { force: true });
          cy.get(selectors.pages.registration.phoneGroup)
            .find("input")
            .type(this.data.valid.phone);
          cy.get(selectors.pages.registration.emailGroup)
            .find("input")
            .type(faker.internet.email());
          cy.get(selectors.pages.registration.passwordGroup)
            .find("input")
            .type(this.data.valid.password);
        });
        break;
      case "existingAcct":
        cy.fixture("selectors.json").then((selectors) => {
          cy.get(selectors.pages.registration.firstNameGroup)
            .find("input")
            .type(this.data.existingAcct.firstName);
          cy.get(selectors.pages.registration.lastNameGroup)
            .find("input")
            .type(this.data.existingAcct.lastName);
          cy.get(selectors.pages.registration.dateOfBirthGroup)
            .find("input")
            .type(
              `${this.data.existingAcct.dateOfBirth.yyyy}-${this.data.existingAcct.dateOfBirth.mm}-${this.data.existingAcct.dateOfBirth.dd}`
            );
          cy.get(selectors.pages.registration.addressGroup)
            .find("input")
            .type(this.data.existingAcct.address);
          cy.get(selectors.pages.registration.postCodeGroup)
            .find("input")
            .type(this.data.existingAcct.postCode);
          cy.get(selectors.pages.registration.cityGroup)
            .find("input")
            .type(this.data.existingAcct.city);
          cy.get(selectors.pages.registration.stateGroup)
            .find("input")
            .type(this.data.existingAcct.state);
          cy.get(selectors.pages.registration.countryGroup)
            .find("select")
            .select(this.data.existingAcct.country, { force: true });
          cy.get(selectors.pages.registration.phoneGroup)
            .find("input")
            .type(this.data.existingAcct.phone);
          cy.get(selectors.pages.registration.emailGroup)
            .find("input")
            .type(this.data.existingAcct.email);
          cy.get(selectors.pages.registration.passwordGroup)
            .find("input")
            .type(this.data.existingAcct.password);
        });
        break;
      default:
        break;
    }
    this.isValidForSubmission = true;
    return this;
  };

  submitForm = () => {
    const assertionMap = {
        valid: {
            responseCode: 201,
            url: "/auth/login"
        },
        existingAcct: {
            responseCode: 422,
            url: "/auth/register"
        }
    }
    cy.intercept(
      "POST",
      "https://api.practicesoftwaretesting.com/users/register"
    ).as("registerUser");
    cy.fixture("selectors.json").then((selectors) => {
      this.isValidForSubmission &&
        cy.get(selectors.pages.registration.submitButton).click();
    });
    cy.wait("@registerUser").its("response.statusCode").should("eq", assertionMap[this.keyScenario].responseCode);
    cy.url().should("include", assertionMap[this.keyScenario].url);
    return this;
  };
}

export default Register;
