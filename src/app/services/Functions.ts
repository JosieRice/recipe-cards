import { auth, provider } from "./firebase";

export const login = () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      // this.setState({
      //   user
      // });
      console.log("LOGIN", user);
    });
  
};