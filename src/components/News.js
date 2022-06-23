import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top HeadLines</h2>
        <div className="row">
          <div className="col-md-4 my-3">
            <NewsItem title="mytitle" description="mydesp" />
          </div>
          <div className="col-md-4 my-3">
            <NewsItem title="mytitle" description="mydesp" />
          </div>
          <div className="col-md-4 my-3">
            <NewsItem title="mytitle" description="mydesp" />
          </div>
        </div>
      </div>
    );
  }
}

export default News;
