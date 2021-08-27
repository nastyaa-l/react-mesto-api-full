import logo from "../image/logo.svg"
import {Link} from "react-router-dom"

function Header(props) {
  return (
    <header className="header section page__header">
      <img className="header__logo" alt="Логотип сайта" src={logo} />
      <div className="header__nav">
				<Link to="/" className="header__link">{props.email}</Link>
				<button onClick={props.onClick} className="header__subscribe">{props.text}</button>
			</div>
    </header>
  );
}

export default Header
