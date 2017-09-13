import React, { PropTypes } from "react";
import { Link } from "react-router";
import telegramBotBanner from "../../../images/Techpin-bot-banner.jpg";
import { footerText } from "../../helpers/staticText";
import gitRepo from "../../helpers/links";

const TelegramBot = () => (
  <div className="telegram-bot">
    <a href="https://t.me/techpin_bot" target='_blank'>
      <img src={telegramBotBanner} alt="telegram bot" />
    </a>
  </div>
);
const Footer = props => {
  return (
    <div className="footer">
      <section className="footer-about">
        <div>
          <span>TechPin, Dynamic list of startups & accelerators in Iran</span>
          <p>{footerText}</p>
        </div>
        <TelegramBot />
      </section>
      <section className="copyright">
        <ul>
          <li>
            TechPin © 2017. &nbsp;{" "}
            <a href={gitRepo}>TechPin is an Open Source</a>
            , Crowd Sourced Project &nbsp;
            <a href="http://www.mozilla.org/en-US/MPL/2.0/">Under MPL 2.0</a>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="contribute">Contribute</Link>
          </li>
          <li>
            <a href="http://blog.techpin.ir" target="_blank">
              Blog
            </a>
          </li>
        </ul>
      </section>
      <section className="passion">
        Made With Passion & Powered By{" "}
        <a href="http://www.idearun.co" target="_blank">
          Idearun Startup Studio
        </a>
      </section>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
