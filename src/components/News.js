import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsMonkey-${this.capitalizeFirstLetter(this.props.category)}`;
  }

  //This can be set and call in all three fn 
  // async updateNews(){
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb6e9fe2acd24cb4b84daaa86d8ba702&page=${this.state.page}&pagesize=${this.props.pageSize}`; 
  //     this.setState({loading:true});
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //         page:this.state.page + 1,
  //         articles: parsedData.articles,
  //         loading:false
  //     });
  // }

  async componentDidMount() {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb6e9fe2acd24cb4b84daaa86d8ba702&page=1&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
    }
    catch (e) {
      console.log("something is not working");
    }

    // this.updateNews();

  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb6e9fe2acd24cb4b84daaa86d8ba702&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });

    // this.setState(page: this.state.page - 1);
    // this.updateNews();
  }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb6e9fe2acd24cb4b84daaa86d8ba702&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    }
    // this.setState(page: this.state.page - 1);
    // this.updateNews();   
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb6e9fe2acd24cb4b84daaa86d8ba702&page=1&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
};

render() {
  return (
<>
      <h1 className="text-center" style={{ margin: '35px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
      {this.state.loading && <Spinner/>}
      <InfiniteScroll dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Spinner />} >

        <div className="container">

          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>

        </div>
      </InfiniteScroll>
    </>
  );
}

}
export default News;