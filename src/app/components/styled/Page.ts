import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Sriracha&display=swap');
  body {
    font-family: 'Sriracha', cursive;
  }
`

export const Page = styled.div`
  background-color: #fff;
  margin-top: 60px;
`;

export const Modal = styled.div`
  position: absolute;
  background: #fff;
  top: 25px;
  left: 10%;
  right: 10%;
  border: 2px solid #444;
`

export const RecipeCard = styled.div`
  background: #fff;
  padding: 15px;
`