import LandingCss from "./Landing.module.css";

// img/icons
import imgLanding from "../../public/img/imgLanding.png";
import DumbGram from "../../public/img/DumbGram.png";

function LandingComponent(dataProps) {
  const { handleShowLogin, handleShowRegister } = dataProps;

  return (
    <div className={LandingCss.Content}>
      <div className={LandingCss.Group1}>
        <img src={DumbGram} />
        <h1>Share your best photos or videos</h1>
        <p>
          Join now, share your creations with another people and enjoy other
          creations.
        </p>
        <div className={LandingCss.GroupBtn}>
          <button className={LandingCss.Button1} onClick={handleShowLogin}>
            Login
          </button>
          <button className={LandingCss.Button2} onClick={handleShowRegister}>
            Register
          </button>
        </div>
      </div>
      <div className={LandingCss.Group2}>
        <img className={LandingCss.imgLanding} src={imgLanding} />
      </div>
    </div>
  );
}
export default LandingComponent;
