import React from "react";
import HeaderCss from "./Header.module.css"

// img or icons
import DumbGram from "../../public/img/DumbGram.png"

export default function HeaderLogo() {
  return (
    <div className={HeaderCss.Container}>
      <img src={DumbGram} />
    </div>
  );
}
