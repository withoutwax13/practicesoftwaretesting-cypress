import loginInvalidEmailFormat from "./invalid-email-format";
import loginInvalidCreds from "./login-invalid-creds.cy";
import loginValidCreds from "./login-valid-creds";
import loginWithGoogle from "./login-with-google";

describe("Login Scenarios", () => {
    it("should login a valid user credentials", loginValidCreds);
    it("should not login an invalid user credentials", loginInvalidCreds);
    it("should not login a user with an invalid email format", loginInvalidEmailFormat);
    it("should login with google account", loginWithGoogle);
});