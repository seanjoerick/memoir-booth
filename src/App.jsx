import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Landing from "./pages/landing/Landing";
import Start from "./pages/start/Start";
import Capture from "./pages/capture/Capture";
import Print from "./pages/print/Print";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.START} element={<Start />} />
        <Route path={ROUTES.CAPTURE} element={<Capture />} />
        <Route path={ROUTES.PRINT} element={<Print />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
