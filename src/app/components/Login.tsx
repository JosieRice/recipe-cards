import * as React from "react";
// import firebase from 'firebase';

// var provider = new firebase.auth.GoogleAuthProvider();

// firebase.auth().signInWithRedirect(provider);

export default class Login extends React.Component {
  constructor(props: any) {
    super(props);
  }

  handleChange(e: any) {
    console.log("change", e);
  }
  logout = () => {
    console.log("LOGOUT");
  };
  login = () => {
    // auth.signInWithPopup(provider)
    //   .then((result) => {
    //     const user = result.user;
    //     this.setState({
    //       user
    //     });
    //   });
    console.log("LOGIN");
  };

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <button onClick={this.logout}>Log Out</button>
        <button onClick={this.login}>Log In</button>
      </div>
    );
  }
}
