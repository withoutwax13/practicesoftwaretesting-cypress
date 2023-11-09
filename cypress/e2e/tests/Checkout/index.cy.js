import guestCheckout from "./guest-checkout";
import registeredUserCheckout from "./registered-user-checkout";

describe("Checkout Scenarios", () => {
  it("guest checkout", guestCheckout);
  it("registered user succesful checkout", registeredUserCheckout);
});
