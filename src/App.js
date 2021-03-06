// Import: Packages
import React from "react";
import styled from "styled-components/macro";
import Dexie from "dexie";

// Import: Components
import { ApiFetch } from "./app/components";

// Component: App
export default function App() {
  // Dexie: declaring IndexedDB apiDb
  const apiDb = new Dexie("ApiDb");

  return (
    <>
      <Container>
        <ApiFetch db={apiDb} />
      </Container>
    </>
  );
}

// Element: Container
const Container = styled.div`
  align-items: center;
  background-color: #eaeaec;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
  width: 100%;
`;
