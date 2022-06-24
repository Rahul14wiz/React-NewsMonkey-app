import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {

    constructor(){
        super();
        // console.log("hello i m constructor from news componenents");
        this.state = {
            articles:[ ],
            loading: false
        }
    }

    async componentDidMount(){
        try{   
            let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=eb6e9fe2acd24cb4b84daaa86d8ba702";     
            const data = await fetch(url);
            const parsedData = await data.json();
            this.setState({
                articles: parsedData.articles
            });
        }
        catch(e) {
            console.log("something is not working");
        }
    }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top HeadLines</h2>
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4 my-3"  key={element.url}>
            <NewsItem title={element.title?element.title:""}description={element.description?element.description:" "} imageUrl = {element.urlToImage} newsUrl={element.url}/>
          </div>
        })}

        </div>
      </div>
    );
  }
}

export default News;
