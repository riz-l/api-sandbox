// Import: Packages
import styled from "styled-components/macro";

// Element: Container
export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;

  & h1 {
    color: #2a2a2e;
    font-size: 4rem;
    padding: 2rem;
    text-transform: uppercase;
  }

  & button {
    background-color: #f1f1f1;
    border: 1px solid #2a2a2e;
    border-radius: 80px;
    color: #2a2a2e;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-bottom: 2rem;
    transition: all 100ms linear;

    &:hover {
      background-color: #2a2a2e;
      color: #f1f1f1;
      transition: all 100ms linear;
    }
  }
`;

// Element: Wrapper
export const Wrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
`;
