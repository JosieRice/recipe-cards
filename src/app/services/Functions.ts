import { auth, provider } from "./firebase";

export const login = () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      // @ts-ignore
      this.setState({
        user
      });
      console.log("LOGIN", user);
    });
  
};