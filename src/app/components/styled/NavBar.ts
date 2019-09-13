import styled from "styled-components";

export const NavBar = styled.nav`
  background: #3772ff;
  position: absolute;
  margin: 0;
  padding: 0 20px;
  width: 100%;
  top: 0px;
  left: 0px;
  height: 52px;
`;

export const UL = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`;

export const ListItem = styled.li`
  display: inline-block;
  padding: 0 10px;
  a {
    font-family: "Exo", Arial Black, sans-serif;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
  }

  a:hover {
    text-decoration: underline;
  }

  a:active {
    color: #fff;
  }

  a:visited {
    color: #fff;
  }
`;

export const LoginLI = styled(ListItem)`
  float: right;
  margin-right: 15px;
`;

export const NavButton = styled.button`
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 20px;
  background-color: #f5f1e3;
  color: #050505;
  text-decoration: none;
`;

export const ProfilePhoto = styled.img`
  height: 30px;
  border-radius: 8px;
  border: 1px solid #5c6274;
  position: absolute;
  top: 13px;
  right: 48px;
`;
