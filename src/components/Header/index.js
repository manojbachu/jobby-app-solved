import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="nav-sm-header">
        <Link to="/">
          <img
            className="home-logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-header-elements">
          <Link to="/">
            <li>
              <AiFillHome className="headers-icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsFillBriefcaseFill className="headers-icon" />
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="logout-icon-button"
              onClick={onClickLogout}
            >
              <FiLogOut className="headers-icon" />
            </button>
          </li>
        </ul>
      </div>

      <div className="nav-lg-header">
        <img
          className="home-logo-image"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div className="nav-lg-elements">
          <Link to="/" className="nav-element">
            <p>Home</p>
          </Link>
          <Link to="/jobs" className="nav-element">
            <p>Jobs</p>
          </Link>
        </div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </>
  )
}

export default withRouter(Header)
