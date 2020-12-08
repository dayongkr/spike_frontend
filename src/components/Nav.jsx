import { Link } from "react-router-dom";
import homeLogo from "../img/home-24px.svg";
import contactsLogo from "../img/people-24px.svg";
import recordLogo from "../img/article-24px.svg";
import settingLogo from "../img/settings-24px.svg";

function Nav() {
  return (
    <div id="button-wrapper" className="button-wrapper">
      <Link to="/">
        <div className="logo-button">
          <img
            className="home-logo"
            src={homeLogo}
            alt="logo"
            width="40px"
          ></img>
          <p className="logo-title" id="home-title">
            HOME
          </p>
        </div>
      </Link>
      <Link to="/contact">
        <div className="logo-button">
          <img
            className="contacts-logo"
            src={contactsLogo}
            alt="logo"
            width="40px"
          ></img>
          <p className="logo-title" id="contacts-title">
            CONTACT
          </p>
        </div>
      </Link>

      <Link to="/record">
        <div className="logo-button">
          <img
            className="record-logo"
            src={recordLogo}
            alt="logo"
            width="40px"
          ></img>
          <p className="logo-title" id="record-title">
            RECORD
          </p>
        </div>
      </Link>
      <Link to="/setting">
        <div className="logo-button">
          <img
            className="setting-logo"
            src={settingLogo}
            alt="logo"
            width="40px"
          ></img>
          <p className="logo-title" id="setting-title">
            SETTING
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Nav;
