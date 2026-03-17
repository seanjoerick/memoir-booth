import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "@/pages/landing/Landing";
import Start from "@/pages/start/Start";
import Capture from "@/pages/capture/Capture";
import Print from "@/pages/print/Print";
import { ROUTES } from "@/constants/routes";
import Main from "@/components/layout/Main";

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route path={ROUTES.LANDING} element={<Landing />} />
          <Route path={ROUTES.START} element={<Start />} />
          <Route path={ROUTES.CAPTURE} element={<Capture />} />
          <Route path={ROUTES.PRINT} element={<Print />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
