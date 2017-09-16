import React from "react";

import AppleStoreLogo from "../../../images/app-store.png";
import GoogleStoreLogo from "../../../images/google-play.png";
import LinkedLogo from "../../../images/linkedin-logo.svg";
import InstagramLogo from "../../../images/instagram-logo.svg";
import TwitterLogo from "../../../images/twitter-logo.svg";

const SocialNetworks = ({ socialData }) => {
  // this is ugly as hell => refactor
  return (
    <div className="single-link">
      <div className="social-media">
        <a
          href={socialData.linkedin || ""}
          target="_blank"
          className={socialData.linkedin ? "" : "social-disabled"}
        >
          <img id="linkedin" src={LinkedLogo} alt="" />
        </a>
        <a
          href={socialData.instagram || ""}
          target="_blank"
          className={socialData.instagram ? "" : "social-disabled"}
        >
          <img id="instagram" src={InstagramLogo} alt="" />
        </a>
        <a
          href={socialData.twitter || ""}
          target="_blank"
          className={socialData.twitter ? "" : "social-disabled"}
        >
          <img id="instagram" src={TwitterLogo} alt="" />
        </a>
      </div>
      <a
        href={socialData.ios || ""}
        target="_blank"
        className={socialData.ios ? "" : "social-disabled"}
      >
        <img src={AppleStoreLogo} alt="" />
      </a>
      <a
        href={socialData.android || ""}
        target="_blank"
        className={socialData.android ? "" : "social-disabled"}
      >
        <img src={GoogleStoreLogo} alt="" />
      </a>
    </div>
  );
};

export default SocialNetworks;
