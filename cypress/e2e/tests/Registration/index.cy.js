import registerExistingAcctSpec from "./register-existing-acct";
import registerNewUserSpec from "./register-new-user";

describe("Registration Scenarios", () => {
    it("should register a new user", registerNewUserSpec);
    it("should not register a new user with an existing account", registerExistingAcctSpec);
});