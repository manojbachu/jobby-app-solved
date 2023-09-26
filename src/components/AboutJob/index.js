import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: '"FAILURE',
}

class AboutJob extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }
    const {jobDetails, similarJobs} = updatedData

    if (response.ok) {
      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.onClickRetry}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    const {skills, lifeAtCompany} = jobDetails

    return (
      <>
        <div className="job-details">
          <div className="title-container">
            <img
              className="company-logo"
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job-title-container">
              <h4 className="job-title">{jobDetails.title}</h4>
              <div className="rating-container">
                <BsFillStarFill className="star-image" />
                <p className="rating">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-salary">
            <div className="location-and-type">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{jobDetails.location}</p>
              </div>
              <div className="location-container">
                <BsFillBriefcaseFill className="location-icon" />
                <p className="location">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="package">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="break-line" />
          <div className="description-header-container">
            <h3 className="description-heading">Description</h3>)
            <a
              href={jobDetails.companyWebsiteUrl}
              rel="noreferrer"
              target="_blank"
              className="hyperlink"
            >
              Visit <BiLinkExternal />
            </a>
          </div>
          <p className="job-description">{jobDetails.jobDescription}</p>
          <h3 className="skills-heading">Skills</h3>
          <ul className="skills-container">
            {skills !== undefined &&
              skills.map(skill => (
                <li key={skill.name} className="skill-item">
                  <img
                    className="skill-image"
                    src={skill.imageUrl}
                    alt={skill.name}
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
          </ul>
          <h3 className="skills-heading">Life at Company</h3>
          {lifeAtCompany !== undefined && (
            <div className="life-at-company-container">
              (<p className="job-description">{lifeAtCompany.description}</p>
              <img
                className="life-at-company-image"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
              )
            </div>
          )}
        </div>
        <div className="similar-job-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs">
            {similarJobs.map(eachJob => (
              <SimilarJobCard jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderAboutJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.jobsFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="about-job">{this.renderAboutJobs()}</div>
      </>
    )
  }
}

export default AboutJob
