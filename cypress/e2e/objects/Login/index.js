class Login {
  constructor(data = null) {
    this.data = data || Cypress.env("data").login;
    this.keyScenario = "valid";
  }

  init = () => {
    cy.visit("#/auth/login");
    cy.url().should("include", "/auth/login");
    // verify if all elements are present on the page
    cy.fixture("selectors.json").then((selectors) => {
      Object.keys(selectors.pages.login).forEach((key) => {
        cy.get(selectors.pages.login[key]).should("be.visible").and("exist");
      });
    });
    return this;
  };

  fillForm = (key = "") => {
    this.keyScenario = key || "valid";
    switch (key) {
      case "":
        cy.fixture("selectors.json").then((selectors) => {
          const loginSelectors = selectors.pages.login;
          cy.get(loginSelectors.emailGroup).find("input").clear();
          cy.get(loginSelectors.emailGroup).type(this.data.valid.email);
          cy.get(loginSelectors.passwordGroup).find("input").clear();
          cy.get(loginSelectors.passwordGroup).type(this.data.valid.password);
        });
        break;
      case "invalid":
        cy.fixture("selectors.json").then((selectors) => {
          const loginSelectors = selectors.pages.login;
          cy.get(loginSelectors.emailGroup).find("input").clear();
          cy.get(loginSelectors.emailGroup)
            .find("input")
            .type(this.data[key].email);
          cy.get(loginSelectors.passwordGroup).find("input").clear();
          cy.get(loginSelectors.passwordGroup)
            .find("input")
            .type(this.data[key].password);
        });
        break;
      case "invalidEmailFormat":
        cy.fixture("selectors.json").then((selectors) => {
          const loginSelectors = selectors.pages.login;
          cy.get(loginSelectors.emailGroup).find("input").clear();
          cy.get(loginSelectors.emailGroup)
            .find("input")
            .type(this.data[key].email);
        });
        break;
      default:
        break;
    }
    return this;
  };

  submitForm = () => {
    const assertionMap = {
      valid: {
        url: "#/account",
      },
      invalid: {
        url: "/auth/login",
      },
      invalidEmailFormat: {
        url: "/auth/login",
      },
    };
    cy.intercept(
      "POST",
      "https://api.practicesoftwaretesting.com/users/login"
    ).as("succesfulLogin");
    cy.fixture("selectors.json").then((selectors) => {
      cy.get(selectors.pages.login.loginButton).click();
    });
    this.keyScenario === "valid" &&
      cy.wait("@succesfulLogin").its("response.statusCode").should("eq", 200);
    cy.url().should("include", assertionMap[this.keyScenario].url);
    return this;
  };

  googleLogin = () => {
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    cy.fixture("selectors.json").then((selectors) => {
      const loginSelectors = selectors.pages.login;
      cy.get(loginSelectors.googleAuth).click();
      cy.get("@windowOpen").should(
        "be.calledWith",
        "https://api.practicesoftwaretesting.com/auth/social-login?provider=google"
      );
    });
  };
}

export default Login;
