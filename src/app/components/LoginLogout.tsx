import * as React from "react";
import { NavButton, } from "./styled/NavBar";
import { auth, provider } from "../services/Firebase";
import { Provider } from "../context/UserContext";
// import console = require("console");

interface MyProps { }
interface MyState {
  user: any;
  setUser: any;
}

export class LoginLogout extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      setUser: (value: any) => this.setState({ user: value }, () => console.log('state after login', this.state))
    };
  }

  // persistent login after refresh
  componentDidMount() {
    console.log('state on mount', this.state)
    auth.onAuthStateChanged(user => {
      if (user) {
        this.state.setUser({ user });
      }
    });
  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      console.log('user login', user)
      this.state.setUser({ user });
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.state.setUser(null);
    });
  }

  render() {
    return (
      <Provider value={this.state}>

        {!this.state.user ? (
          <NavButton onClick={() => this.login()}>Log In</NavButton>
        ) : (
            <NavButton onClick={() => this.logout()}>Log Out</NavButton>
          )}

      </Provider>
    );
  }
}
