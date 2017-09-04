import React from "react";
import Logo from "../../../images/techpin.svg";

const SiteDesc = () => (
  <div className="site-desc">
    <div>
      <img src={Logo} alt="techpin logo" />
    </div>
    <div>
      <h1>Dynamic list of startups and accelerators in Iran</h1>
      <div>
        With Techpin you can discover the best new startups and products, every
        day. Its a place for product-loving enthusiasts to share and find out
        about the latest mobile apps, websites, hardware projects, and tech
        creations in Iran.
      </div>
    </div>
  </div>
);

export default SiteDesc;
