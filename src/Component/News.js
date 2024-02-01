import React, { Component } from 'react'
import Newsitem from './Newsitem.js'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




 class News extends Component {
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

  
  constructor(props){
    super(props);
    
    this.state={
      page:1,
      articles:[],
      loading:false,
      totalresult:10
      
    }
    document.title=` Voice-of-India : ${this.props.sub}`;
    this.fetchdata = this.fetchdata.bind(this);
  }

  async fetchdata(){
    this.props.setprogress(25);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdc2cbe0a1f349209cdbae080b833618&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    let data= await fetch(url);
    this.props.setprogress(50);
    let parsedata= await data.json();
    this.props.setprogress(75);
    // console.log(parsedata);
    if(parsedata.status==429){
      console.log(parsedata.message);
      console.log("limit exed");
    }
    this.props.setprogress(100);
    this.setState({
      articles:parsedata.articles,
      totalresult:parsedata.totalResults,
       loading:false
    })
  }
 
  async componentDidMount(){
        this.fetchdata();
        // console.log(parsedata.totalResults);
        
      }
       prev=async ()=>{
        this.setState({
          page:this.state.page-1
        })
        this.fetchdata();
       
       }
       next=async ()=>{
       this.setState({
        page:this.state.page +1
       })
       this.fetchdata();

        
      }
      fetchMoreData = async () => {
        this.props.setprogress(10);
       this.setState({page:this.state.page+1});
       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdc2cbe0a1f349209cdbae080b833618&page=${this.state.page}&pageSize=${this.props.pageSize}`;
       this.setState({
        //  loading:true
       })
       let data= await fetch(url);
       this.props.setprogress(35);
       let parsedata= await data.json();
       this.props.setprogress(75);
       // console.log(parsedata);
       if(parsedata.status==429){
         console.log(parsedata.message);
         console.log("limit exed");
       }
       this.props.setprogress(100);
       
       this.setState(prevState => ({
        articles: prevState.articles?.concat(parsedata.articles),
        totalresult: parsedata.totalResults,
        // loading: false
      }))
      };
     
   
      render() {
        
        return (
          <div className="container my-6">
            
            
         

        <div className="heading d-flex justify-content-between"><h1>Voice-of-India  - Top {<b>   {this.props.sub}     </b>} Headlines.</h1>
        {/* <h3>Page : {this.state.page} / {Math.ceil(this.state.totalresult/this.props.pageSize)}</h3>*/}
        </div> 
    
        <InfiniteScroll
  dataLength={this.state.articles?.length||0} // Use the length of articles array
  next={this.fetchMoreData} // Use this.fetchdata instead of fetchData
  hasMore={(this.state.articles?.length!==this.state.totalresult)}

  loader={this.state.hasMore ? (
    null
  ) : <Spinner />}
  
>
                          
                     <div className="container"> <div className="row my-4">
                      {/* {this.state.loading && <Spinner/>} */}
                            {this.state.articles && this.state.articles.map((element)=>{
                                return <div className='col-md-4' key={element.url}>
                                  <Newsitem  title={element.title?element.title.slice(0,60):""}  description={element.description?element.description.slice(0,120):""} urlToImage={element.urlToImage?element.urlToImage:"https://michal.sapka.me/logos/right.png"} url={element.url}  time={element.publishedAt} author={element.author} source={element.source.name}/>

                                </div>
                            })}
                      </div></div>

                      </InfiniteScroll>
                 


        {/* <div className="d-flex justify-content-around my-5">
          <button disabled={this.state.page<=1} className='btn btn-dark ' onClick={this.prev}>Prev &larr;</button>
          <button disabled={Math.ceil(this.state.totalresult/this.props.pageSize)<this.state.page+1} className='btn btn-dark' onClick={this.next} >Next  &rarr;</button>
        </div> */}
        

        
      </div>
    )
  }
}

export default News
