import styled from "styled-components";

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  height: 100vh;
`
const Button = styled.button`
  background-color: ${ props => 
    props.color
  };
  cursor: pointer;
  border: 13px;
  outline: none;
  color: #fff;
  padding: 16px;
  font-size: 1.8rem;
`
const Text = styled.h1`
  color: ${ props => props.color};
  font-size: 1.6rem;
  font-family: Ubuntu;
`

export { Wrapper, Button, Text }