import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavBar, UnorderedList, ListItem, LoginLI, NavButton, ProfilePhoto } from "./styled/NavBar";
import { Index } from "./Index";
import { About } from "./About";
import { auth, provider } from "../services/Firebase";
import { Provider } from "../context/UserContext";
import { UserObj } from "../types/UserObj";

interface MyProps { }

interface MyState {
  user: UserObj;
  setUser: any;
}

export class Navigation extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      setUser: (user: UserObj) => this.setState({ user })
    };
  }

  // persistent login after refresh
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.state.setUser(user);
      }
    });
  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user: UserObj = result.user;

      this.state.setUser(user);
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
        <Router>
          <NavBar>
            <UnorderedList>
              <ListItem>
                <Link to="/">Home</Link>
              </ListItem>

              <ListItem>
                <Link to="/about/">About</Link>
              </ListItem>

              {this.state.user && this.state.user.displayName}

              <LoginLI>
                {!this.state.user ? (
                  <NavButton onClick={() => this.login()}>Log In</NavButton>
                ) : (
                    <NavButton onClick={() => this.logout()}>Log Out</NavButton>
                  )}
              </LoginLI>

              {this.state.user && (
                <LoginLI>
                  <ProfilePhoto src={this.state.user.photoURL} />
                </LoginLI>
              )}
            </UnorderedList>
          </NavBar>

          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
        </Router>
      </Provider>
    );
  }
}
