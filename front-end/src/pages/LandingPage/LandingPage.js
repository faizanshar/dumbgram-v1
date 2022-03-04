import { useState } from "react";
import LandingCss from "./Landing.module.css"

// Components
import LandingComponent from "../../components/LandingComponent/LandingComponent";
import Login from "../../components/Modal/Login";
import Register from "../../components/Modal/Register";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };
  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };
  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);

  return (
    <div className={LandingCss.Container}>
      <LandingComponent
        handleShowLogin={handleShowLogin}
        handleShowRegister={handleShowRegister}
      />
      <Login
        show={showLogin}
        handleCloseLogin={handleCloseLogin}
        handleShowRegister={handleShowRegister}
      />
      <Register
        show={showRegister}
        setShow={setShowRegister}
        handleCloseRegister={handleCloseRegister}
        handleShowLogin={handleShowLogin}
      />
    </div>
  );
}

export default LandingPage;
