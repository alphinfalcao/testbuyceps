import React from "react";
import { Link } from "react-router-dom";

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchtitle: "batman",
      searchyear: "",
      searchid: "",
      searchres: [],
      searchres1: [],
      page: 1,
      loading: false,
      prevY: 0
    };
  }
  async componentDidMount() {
    this.updateSearch(1,this.state.page);
     var options = {
      root: null, // Page as root
      rootMargin: "0px",
      threshold: 1.0
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this), //callback
      options
    );
    this.observer.observe(this.loadingRef);
  }
  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
        this.setState({ page: this.state.page + 1 })
    }
    this.setState({ prevY: y });
    console.log(this.state.page);
    this.updateSearch(2,this.state.page);
  }
  updateSearch(event,page) {
    if (this.state.searchid === "") {
        console.log(page)
      this.setState({ loading: true });
      const apiUrl = `http://www.omdbapi.com/?&apikey=69e759&s=${this.state.searchtitle}&y=${this.state.searchyear}&page=${page}`;
      console.log(this.state.searchtitle)
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ searchres: data.Search });
          this.setState({ loading: false });
          window.scrollTo({ top: 200, behavior: 'smooth' })
        });
    } else {
        console.log('in else')
      const apiUrl = `http://www.omdbapi.com/?&apikey=69e759&i=${this.state.searchid}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ searchres1: data });
        });
      console.log("in else");
    }
  }
  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  addDefaultSrc(ev) {
    ev.target.src =
      "https://cdn.blankstyle.com/files/imagefield_default_images/notfound_0.png";
  }
  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    return (
      <div>
        <h1 className="text-center grey py-5">Explore more movies</h1>
        <div className="container-fluid">
          <div className="searchbox row w-50 m-auto py-3">
            <div className="col-3">
              <input
                type="text"
                name="searchtitle"
                placeholder="Search Title"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                placeholder="Year"
                name="searchyear"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                placeholder="Id"
                name="searchid"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="col-3">
              <button onClick={this.updateSearch.bind(this)}>Search</button>
            </div>
          </div>
          <div className="row px-5 mx-5 pt-5" style={{ minHeight: "600px" }}>
            {this.state.searchres?.map((k,index) => (
              <div className="col-sm-4 my-3" key={index}>
                <Link to={`/${k.Title}`} className="nounderline">
                  <div className="card rounded-3">
                    <div className="row">
                      <div className="col-sm-6 pr-4">
                        <img
                          className="d-block w-100"
                          src={k.Poster}
                          alt="poster-img"
                          onError={this.addDefaultSrc}
                        />
                      </div>
                      <div className="col-sm-6 pl-1">
                        <div className="card-block">
                          <div className="resp-title">
                            <h3>
                              {k.Title.length > 32
                                ? k.Title.substr(0, 32) + "..."
                                : k.Title}
                            </h3>
                          </div>
                          <span>Year</span>
                          <p>{k.Year}</p>
                          <span>Type</span>
                          <p>{k.Type}</p>
                          <span>Imdb Id</span>
                          <p>{k.imdbID}</p>
                          <a
                            href={`movies/${k.Title}`}
                            class="float-right mr-4 mb-2"
                          >
                            More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
          <div className="row">
            {this.state.searchid && (
              <h2>1{console.log(this.state.searchres1)}</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieSearch;