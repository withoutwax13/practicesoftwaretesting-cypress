import Register from "../../objects/Register";

const registerNewUserSpec = () => {
    const registrationObj = new Register();
    registrationObj.init().fillForm().submitForm();
    // add step for logging in with the new user
}

export default registerNewUserSpec;