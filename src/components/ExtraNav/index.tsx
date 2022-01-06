import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { ExtraNavContext } from "../../contexts/ExtraNavContext";
import "./ExtraNav.scss";
const ExtraNav = () => {
  const { Eaction, toggleExtraNav } = useContext(ExtraNavContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleExtraNav();
  };

  return (
    <div className={`extra-nav ${Eaction}`}>
      <ul>
        <li>
          <Link to="/">
            <span className="icon" onClick={handleClick}>
              <i className="fas fa-align-left"></i>
            </span>
            <div className="logo" onClick={() => toggleExtraNav()}>
              <img src={logo} alt="logo" />
            </div>
          </Link>
        </li>
        <li onClick={() => toggleExtraNav()}>
          <Link to="/">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
            <span className="title">Trang chủ</span>
          </Link>
        </li>
        <li onClick={() => toggleExtraNav()}>
          <Link to="/explore">
            <span className="icon">
              <i className="far fa-compass"></i>
            </span>
            <span className="title">Khám phá</span>
          </Link>
        </li>
        <li onClick={() => toggleExtraNav()}>
          <Link to="/subscriptions">
            <span className="icon">
              <i className="fab fa-youtube-square"></i>
            </span>
            <span className="title">Kênh đăng ký</span>
          </Link>
        </li>
        <li onClick={() => toggleExtraNav()}>
          <Link to="/library/playlist">
            <span className="icon">
              <i className="far fa-play-circle"></i>
            </span>
            <span className="title">Thư viện</span>
          </Link>
        </li>
        <li onClick={() => toggleExtraNav()}>
          <Link to="/contact">
            <span className="icon">
              <i className="fas fa-phone-square-alt"></i>
            </span>
            <span className="title">Liên hệ</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ExtraNav;
