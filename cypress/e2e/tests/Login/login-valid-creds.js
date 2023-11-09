import Login from "../../objects/Login";

const loginValidCreds = () => {
    const loginObj = new Login();
    loginObj.init()
        .fillForm()
        .submitForm();
}

export default loginValidCreds;