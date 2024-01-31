import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Newsitem extends Component {
   f
    render() {
      let {title,description,urlToImage,url,time,author,source}=this.props;
    return (
      <div className='my-3 ' >
        <div className="card" style={{width: "18rem"}}>
        <span className="position-absolute top-10  translate-middle badge rounded-pill bg-danger" style={{left:'90%'}}>
    {source}
  </span>
  <img src={urlToImage} className="card-img-top" alt="Image"/>
  <div className="card-body">
    <h5 className="card-title"> {title}.... </h5>
    <p className="card-text">{description}....</p>
    <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} AT {new Date(time).toGMTString()}</small></p>
    <a href={url}  target="_blank"  className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
        
      </div>
    )
  }
}

export default Newsitem
