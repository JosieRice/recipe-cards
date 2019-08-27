import styled from "styled-components";

export const Page = styled.div`
  background-color: #fff;
  margin-top: 75px;
  margin-left: 21px;
`;

export const RecipeCard = styled.div`
  background-color: #f2eecb;
  padding: 15px;
`;

export const H1 = styled.h1`
  font-family: "Exo", Arial Black, sans-serif;
  color: #5c6274;
`;

export const P = styled.p`
  font-family: "Palanquin", "Trebuchet MS", sans-serif;
  font-size: 14px;
  color: #5c6274;
  line-height: 18px;
`;

export const ULCards = styled.ul`
  list-style-type: none;
  padding-inline-start: unset;
  display: flex;
  flex-wrap: wrap;
`;

export const LICards = styled.li`
  font-family: "Palanquin", "Trebuchet MS", sans-serif;
  font-size: 14px;
  color: #5c6274;
  line-height: 18px;
  border: 1px solid #5c6274;
  border-radius: 3px;
  margin: 5px;
  min-width: 225px;
  max-width: 225px;
  height: 250px;
  position: relative;
`;

export const Photo = styled.img`
  max-width: 225px;
  max-height: 199px;
`;

export const TitleContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 225px;
  height: 45px;
  padding-top: 5px;
  border-top: 1px solid #5c6274;
`;

export const Title = styled.h2`
  margin: 0;
  color: #5c6274;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
`;

export const Label = styled.label`
  font-family: "Palanquin", "Trebuchet MS", sans-serif;
  font-size: 14px;
  color: #5c6274;
  line-height: 18px;
  display: inline-block;
  width: 100px;
  vertical-align: top;
`;

export const Input = styled.input`
  width: 250px;
  height: 32px;
  margin-bottom: 14px;
  border: 1px solid #5c6274;
  border-radius: 5px;
  padding-left: 14px;
  font-family: "Palanquin", "Trebuchet MS", sans-serif;
  font-size: 14px;
  color: #5c6274;
  line-height: 18px;
`;

export const TextArea = styled.textarea`
  width: 250px;
  margin: 0px 0px 14px;
`;
