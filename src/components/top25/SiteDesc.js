import React from "react";
import Logo from "../../../images/techpin-logo.svg";
import RaisedButton from "material-ui/RaisedButton";
// import scrollTo from "../../helpers/scroll";
import scrollToComponent from "react-scroll-to-component";

const scrollToDueDiligence = () => {
  scrollToComponent(document.getElementById("contact-form"), {
    align: "top",
    duration: 1500
  });
};

const SiteDesc = ({ openAddProductModal }) => (
  <div className="site-desc">
    <div>
      <img src={Logo} alt="techpin logo" />
    </div>
    <div className="vert-divider" />
    <div>
      <h1>Connect to innovative startups, VCs & Accelerators in MENA</h1>
      <p>Discover the best growing and new startups and products in middle east</p>
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
