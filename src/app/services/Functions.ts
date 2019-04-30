import { auth, provider } from "./Firebase";

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