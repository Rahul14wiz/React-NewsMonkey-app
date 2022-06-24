import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {

    constructor(){
        super();
        // console.log("hello i m constructor from news componenents");
        this.state = {
            articles:[ ],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        try{   
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=eb6e9fe2acd24cb4b84daaa86d8ba702&page=1&pageSize=${this.props.pageSize}`;  
            this.setState({loading:true});     
            const data = await fetch(url);
            const parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                totalResults:parsedData.totalResults,
                loading:false
            });
        }
        catch(e) {
            console.log("something is not working");
        }
    }

    handlePrevClick =async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=eb6e9fe2acd24cb4b84daaa86d8ba702&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;   
        this.setState({loading:true});  
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page:this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        }); 
    }

    handleNextClick =async ()=>{
        if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=eb6e9fe2acd24cb4b84daaa86d8ba702&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`; 
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page:this.state.page + 1,
                articles: parsedData.articles,
                loading:false
            });
        }    
    }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top HeadLines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4 my-3"  key={element.url}>
            <NewsItem title={element.title?element.title:""}description={element.description?element.description:" "} imageUrl = {element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled = {this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button> 
        </div>

      </div>
    );
  }
}

export default News;
