import React from "react";
import Logo from "../../../images/techpin.svg";

const SiteDesc = () => (
  <div className="site-desc">
    <div>
      <img src={Logo} alt="techpin logo" />
    </div>
    <div className="vert-divider" />
    <div>
      <h1>Dynamic list of startups and accelerators in Iran</h1>
      <p>
        Discover the best new startups and products.
      </p>
    </div>
  </div>
);

export default SiteDesc;
