import Login from "../../objects/Login";

const loginWithGoogle = () => {
  const loginObj = new Login();
  loginObj.init().googleLogin();
};

export default loginWithGoogle;