import './index.css'

const NotFound = () => (
  <div className="not-found">
    <img
      className="not-found-image"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="failure-heading">Page Not Found</h1>
    <p className="failure-text">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
