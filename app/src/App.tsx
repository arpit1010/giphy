import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';
import LandingList from './components/landing-list/landing-list';
import SearchBar from './components/search-bar/search-bar';
import _ from 'lodash';
import {
  ModalProvider
} from 'react-simple-hook-modal';

interface AppState {
  gifs: any,
  pageCount: number,
  lastSearchTerm: string,
  forcePage: number
}
interface AppProps {

}
const API_KEY = "tVaJe9QRTL6VZp9xhBkogbNWFTI9hYnJ"

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gifs: {
        data: []
      },
      pageCount: 0,
      lastSearchTerm: "",
      forcePage: 0
    }
    //this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.fetchGifs("", 35, 0)
  }

  public fetchGifs(searchTerm: string, limit: number, offset: number) {
    const url = searchTerm === "" ? `http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}` : `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=${limit}&offset=${offset}`;
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log("Error");
        } else {
          this.setState({
            gifs: json,
            pageCount: json.pagination.total_count,
            lastSearchTerm: searchTerm,
            forcePage: searchTerm !== "" && offset === 0 ? 0 : offset / 35
          });
        }
      })
  }
  public handlePageClick = (data: any) => {
    console.log(data);
    const offset = data.selected * 35;
    this.fetchGifs(this.state.lastSearchTerm, 35, offset)
  }
  render() {
    //debouncing using lodash method to avoid useless call to api with every keystroke
    const fetchGifs = _.debounce((searchTerm) => { this.fetchGifs(searchTerm, 35, 0) }, 400);
    if (!this.state.gifs.data) {
      return null;
    } else {
      return (
        // 3rd party library component for modal
        <ModalProvider>
          <div className="container mx-auto flex flex-col items-center">
            <SearchBar onChange={(searchTerm: any) => fetchGifs(searchTerm)} />
            <div className="box-border">
              <LandingList gifs={this.state.gifs.data} />
            </div>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
              forcePage={this.state.forcePage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </ModalProvider>
      );
    }
  }
}
export default App;