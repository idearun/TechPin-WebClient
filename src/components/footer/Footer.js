import React from 'react'
import { Link } from 'react-router'
import telegramBotBanner from '../../../images/Techpin-bot-banner.png'
import { footerText } from '../../helpers/staticText'
import gitRepo from '../../helpers/links'

const TelegramBot = () => (
  <div className="telegram-bot">
    <a href="https://t.me/techpin_bot" target="_blank">
      <img src={telegramBotBanner} alt="telegram bot" />
    </a>
  </div>
)
const Footer = props => {
  return (
    <div className="footer">
      <section className="footer-about">
        <div>
          <span>Discover & Connect to startups, VCs and accelerators in MENA</span>
          <p>With Techpin you can discover the best new startups and products, every day. Its a place for product-loving enthusiasts to share and find out about the latest mobile apps, websites, hardware projects, and tech creations in middle east region. <br />Techpin helps VCs and angel investors make the right decisions and invest on the most promising startups in MENA.</p>
          <ul className="contact-us-footer">
          <li>
            Contact us via:
          </li>
          <li>
            <a href="mailto:support@techpin.ir" target="_top">Send Mail</a>
          </li>
          <li>
            <a href="https://t.me/Techpin_Support" target="_blank">
              <i className="fa fa-telegram" aria-hidden="true" />
            </a>
          </li>
        </ul>
        </div>
        <TelegramBot />
      </section>
      <section className="copyright">
        <ul>
          <li>
            TechPin © 2018. &nbsp; <a href={gitRepo}>TechPin is an Open Source</a>
            , Crowd Sourced Project &nbsp;
            <a href="http://www.mozilla.org/en-US/MPL/2.0/">Under MPL 2.0</a>
          </li>
        </ul>
        <ul className="footer-social">
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
          <li>
            <a href="https://twitter.com/techpinhq/" target="_blank">
              <i className="fa fa-twitter" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="https://t.me/techpin/" target="_blank">
              <i className="fa fa-telegram" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/13283289/" target="_blank">
              <i className="fa fa-linkedin" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </section>
      <section className="passion">
        Made With Passion & Powered By{' '}
        <a href="http://www.idearun.co" target="_blank">
          Idearun Startup Studio
        </a>
      </section>
    </div>
  )
}

export default Footer
