import React, { Component, useEffect, useState } from 'react'
import Newsitem from './Newsitem.js'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




 const News =(props)=>{
 

  
    let [page,setpage]=useState(1);
    let [articles,setarticles]=useState([]);
    let [loading,setloading]=useState(false);
    let [totalresult,settotalresult]=useState(0);
    
    
    document.title=` Voice-of-India : ${props.sub}`;
    
  

  const fetchdata=async ()=>{
   props.setprogress(25);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bdc2cbe0a1f349209cdbae080b833618&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data= await fetch(url);
    props.setprogress(50);
    let parsedata= await data.json();
    props.setprogress(75);
    // console.log(parsedata);
    if(parsedata.status==429){
      console.log(parsedata.message);
      console.log("limit exed");
    }
   props.setprogress(100);
   setarticles(parsedata.articles);
   settotalresult(parsedata.totalResults);
   setloading(false);
    
  }
  useEffect(() => {
    // Update the document title using the browser API
    fetchdata();
  }, []);
  
  const prev = async () => {
    setpage(page - 1);
    await fetchdata();
  };
  
  const next = async () => {
    setpage(page + 1);
    await fetchdata();
  };
     const fetchMoreData = async () => {
        props.setprogress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bdc2cbe0a1f349209cdbae080b833618&page=${page+1}&pageSize=${props.pageSize}`;
        setloading(true)
        setpage(page+1);
       let data= await fetch(url);
       props.setprogress(35);
       let parsedata= await data.json();
      props.setprogress(75);
       // console.log(parsedata);
       if(parsedata.status==429){
         console.log(parsedata.message);
         console.log("limit exed");
       }
       props.setprogress(100);
       setarticles(articles?.concat(parsedata.articles));
       settotalresult(parsedata.totalResults);
       setloading(false);
       
      };
     
   
     
        
        return (
          <div className="container my-6">
            
            
         

            <div className="heading d-flex justify-content-between" style={{ marginTop: "4.5rem", marginBottom: "-1.5rem" }}>
  <h1>Voice-of-India  - Top {<b>   {props.sub}     </b>} Headlines.</h1>
</div>
    
        <InfiniteScroll
        dataLength={articles?.length || 0}
        next={fetchMoreData}
        hasMore={articles.length < totalresult}
        loader={<Spinner />}
      >
                          
                     <div className="container"> <div className="row my-4">
                      {/* {this.state.loading && <Spinner/>} */}
                            {articles && articles.map((element)=>{
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


export default News
News.defaultProps = {
  country: 'in',
  pageSize:9,
  sub:'general',
  category : 'general'
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  sub: PropTypes.string,
  category: PropTypes.string,
}