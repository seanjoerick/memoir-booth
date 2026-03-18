import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "@/pages/landing/Landing";
import Start from "@/pages/start/Start";
import Capture from "@/pages/capture/Capture";
import Card from "@/pages/card/Card";
import Print from "@/pages/print/Print";
import { ROUTES } from "@/constants/routes";
import Main from "@/components/layout/Main";
import { PhotoProvider } from "@/context/PhotoContext";

function App() {
  return (
    <BrowserRouter>
      <PhotoProvider>
        <Main>
          <Routes>
            <Route path={ROUTES.LANDING} element={<Landing />} />
            <Route path={ROUTES.START} element={<Start />} />
            <Route path={ROUTES.CARD} element={<Card />} />
            <Route path={ROUTES.CAPTURE} element={<Capture />} />
            <Route path={ROUTES.PRINT} element={<Print />} />
          </Routes>
        </Main>
      </PhotoProvider>
    </BrowserRouter>
  );
}

export default App;
