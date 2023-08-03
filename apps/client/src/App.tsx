import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter.tsx';

function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
