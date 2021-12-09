import { Route, Routes } from 'react-router-dom';

import Container from "./components/layout/Container";
import Main from "./components/layout/Main";

function App() {
  return (
    <Container>
      <Routes> 
        <Route path='/' element={<Main />} />
      </Routes>
    </Container>  
  );
}

export default App;
