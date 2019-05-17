import styled from "styled-components";

export const NavBar = styled.nav`
  background: #1b9aaa;
  position: absolute;
  margin: 0;
  padding: 0 20px;
  width: 100%;
  top: 0px;
  left: 0px;
  height: 60px;
`;

export const UnorderedList = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li`
  display: inline-block;
  padding: 0 10px;
`;

export const LoginLI = styled(ListItem)`
  float: right;
  margin-right: 15px;
`;

export const NavButton = styled.button`
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 20px;
  background-color: #F5F1E3;
  color: #050505;
  text-decoration: none;
`;

export const ProfilePhoto = styled.img`
  height: 35px;
  border-radius: 50px;
`;

// #050505
// #1B9AAA
// #DDDBCB
// #F5F1E3
// #FFCDB2
