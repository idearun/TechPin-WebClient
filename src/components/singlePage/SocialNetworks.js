import React from "react";

import AppleStoreLogo from "../../../images/app-store.png";
import GoogleStoreLogo from "../../../images/google-play.png";

import LinkedLogo from "../../../images/linkedin-logo.svg";
import TwitterLogo from "../../../images/twitter-logo.svg";
import InstagramLogo from "../../../images/instagram-logo.svg";

const styles = {
  logo: {
    width: 20,
    height: 20
  },
  storeLogo: {
    height: "50px",
    width: "auto",
    margin: "5px 0"
  },
  storeContainer: {
   marginTop: 30
  }
};

const SocialRow = ({ logo, link, title }) => (
  <div className="contact-info-row">
    <img src={logo} alt="" style={styles.logo} />
    <span className="contact-info-title">
      <a
        href={link || ""}
        target="_blank"
        className={link ? "" : "social-disabled"}
      >
        {title}
      </a>
    </span>
  </div>
);

const MobileAppsContainer = ({ children }) => (
  <div style={styles.storeContainer}>{children}</div>
);

const MobileApp = ({ logo, link }) => (
  <div style={{ textAlign: "center" }}>
    <a
      href={link || ""}
      target="_blank"
      className={link ? "" : "social-disabled"}
    >
      <img src={logo} alt="" style={styles.storeLogo} />
    </a>
  </div>
);

const SocialNetworks = ({ socialData }) => {
  return (
    <div className="social-media">
      <SocialRow
        logo={LinkedLogo}
        link={socialData.linkedin}
        title="Linkedin"
      />
      <SocialRow logo={TwitterLogo} link={socialData.twitter} title="Twitter" />
      <SocialRow
        logo={InstagramLogo}
        link={socialData.instagram}
        title="Instagram"
      />
      <MobileAppsContainer>
        <MobileApp logo={AppleStoreLogo} link={socialData.ios} />
        <MobileApp logo={GoogleStoreLogo} link={socialData.android} />
      </MobileAppsContainer>
    </div>
  );
};

export default SocialNetworks;
