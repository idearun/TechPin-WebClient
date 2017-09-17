import React from "react";
import Logo from "../../../images/techpin.svg";
import RaisedButton from "material-ui/RaisedButton";
// import scrollTo from "../../helpers/scroll";

const scrollToDueDiligence = () => {
  document.getElementById("contact-form").scrollIntoView()
};

const SiteDesc = ({ openAddProductModal }) => (
  <div className="site-desc">
    <div>
      <img src={Logo} alt="techpin logo" />
    </div>
    <div className="vert-divider" />
    <div>
      <h1>Dynamic list of startups and accelerators in Iran</h1>
      <p>Discover the best new startups and products.</p>
      <div className="action-buttons-container">
        <RaisedButton
          primary
          onClick={openAddProductModal}
          style={{ marginRight: 20 }}
          labelStyle={{ top: -3 }}
          label="add new product or company"
        />
        <RaisedButton
          onClick={scrollToDueDiligence}
          labelStyle={{ top: -3 }}
          label="Due Diligence service"
        />
      </div>
    </div>
  </div>
);

export default SiteDesc;
