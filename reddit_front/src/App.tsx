import { Main } from './pages/main';
import { NotFound } from './pages/notfound';
import { ShowPosts } from './pages/topics';
import {
  GlobalStyle
} from './global_style';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return <LoadRoutes />;
}

const LoadRoutes = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/r/:community" element={<ShowPosts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;