import React, { Component } from 'react'
import Newsitem from './Newsitem.js'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize:9,
    sub:'general',
    category : 'general'
  }
 static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    sub: PropTypes.string,
    category: PropTypes.string,
  }

  
  constructor(){
    super();
    
    this.state={
      page:1,
      articles:[],
      loading:false,
      totalresult:10
      
    }
  }
 
  async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3eff792110ef432db5ab6ea6cb24cdc9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
          loading:true
        })
        let data= await fetch(url);
        let parsedata= await data.json();
        console.log(parsedata);
        if(parsedata.status==429){
          console.log(parsedata.message);
          console.log("limit exed");
        }
        
        this.setState({
          articles:parsedata.articles,
          totalresult:parsedata.totalResults,
           loading:false
        })
        // console.log(parsedata.totalResults);
        
      }
       prev=async ()=>{
        if(this.state.page==1){
 
        }else{
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3eff792110ef432db5ab6ea6cb24cdc9&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
          window.scrollTo(0,5);
          this.setState({
            loading:true
          })
          let data= await fetch(url);
          let parsedata= await data.json();
          
         
          this.setState({
            articles:parsedata.articles,
           page:this.state.page-1,
           loading:false
          })
        }
       }
       next=async ()=>{
        if(Math.ceil(this.state.totalresult/this.props.pageSize)<this.state.page+1){

        }
      else{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3eff792110ef432db5ab6ea6cb24cdc9&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
       window.scrollTo(0,5);
        this.setState({
          loading:true
        })
        let data= await fetch(url);
        let parsedata= await data.json();
        
        this.setState({
          articles:parsedata.articles,
          page:this.state.page+1,
          loading:false
        })
        
      }
    }
     
 
      render() {
        
        return (
          <div className="container my-4">

        <div className="heading d-flex justify-content-between"><h1>Voice-of-India Top Headlines.{<b>   ( {this.props.sub}  )   </b>}</h1>
        <h3>Page : {this.state.page} / {Math.ceil(this.state.totalresult/this.props.pageSize)}</h3></div>
        {this.state.loading&&<Spinner/>}
        <div className="row my-4">
              {!this.state.loading&& this.state.articles && this.state.articles.map((element)=>{
                  return <div className='col-md-4' key={element.url}>
                    <Newsitem  title={element.title?element.title.slice(0,60):""}  description={element.description?element.description.slice(0,120):""} urlToImage={element.urlToImage?element.urlToImage:"https://michal.sapka.me/logos/right.png"} url={element.url}  time={element.publishedAt} author={element.author} source={element.source.name}/>

                  </div>
               })}
        </div>
        <div className="d-flex justify-content-around my-5">
          <button disabled={this.state.page<=1} className='btn btn-dark ' onClick={this.prev}>Prev &larr;</button>
          <button disabled={Math.ceil(this.state.totalresult/this.props.pageSize)<this.state.page+1} className='btn btn-dark' onClick={this.next} >Next  &rarr;</button>
        </div>
        

        
      </div>
    )
  }
}

export default News
