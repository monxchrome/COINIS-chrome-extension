import { Route, Routes } from "react-router-dom";
import WelcomePage from "./Tabs/pages/WelcomePage";
import LanguagesPage from "./Tabs/pages/LanguagesPage";
import RegisterPage from "./Tabs/pages/RegisterPage";
import MainPage from "./Tabs/pages/MainPage";

const App = () => {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/languages" element={<LanguagesPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};

export default App;
