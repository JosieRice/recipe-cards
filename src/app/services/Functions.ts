import { auth, provider } from "./Firebase";
import { toastError } from "../utilites/Settings";
import { useToasts } from "react-toast-notifications";

const { addToast } = useToasts();

export const login = () => {
  auth
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      // @ts-ignore
      this.setState({
        user
      });
    })
    .catch(function(error) {
      addToast(
        `Unable to create recipe because ${error}, try again later`,
        toastError
      );
      console.error("Error adding document: ", error);
    });
};
