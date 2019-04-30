// import UserContext from "./UserContext";
// import { Component } from "react";
// import * as React from "react";
// import { auth, provider } from "../services/Firebase";

// export default class UserProvider extends Component {
//   state = {
//     user: {}
//   };

//   render() {
//     return (
//       <UserContext.Provider
//         value={{
//           user: this.state.user,
//           login: () => {
//             auth.signInWithPopup(provider).then(result => {
//               const user = result.user;
//               this.setState({ user });
//             })
//           },
//           logout: auth.signOut().then(() => {
//             this.setState({ user: null });
//           }),
//           log: () => {console.log("I'm in the context")}
//         }}
//       >
//         {this.props.children}
//       </UserContext.Provider>
//     );
//   }
// }
