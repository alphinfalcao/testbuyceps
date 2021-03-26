import React from "react";
import Exmovie from './exmovies';

class MovieDetail extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      mdetails:[],
    };
  }
    async componentDidMount() {
    let title=this.props.match.params.mname;
    const apiUrl = `http://www.omdbapi.com/?&apikey=69e759&t=${title}&plot=full`;
    const response = await fetch(apiUrl);
    const json = await response.json();
    this.setState({ mdetails: json });
  }
    render() {
    return (
        <section>
        <div className='banner'>
            <img src={this.state.mdetails.Poster} alt="movie-poster" className="img-fl"/>
            <h2 className="title">{this.state.mdetails.Title}</h2>
            <p className="direcor">Directed by : {this.state.mdetails.Director}</p>
            <p className="mdetails"><span>{this.state.mdetails.Runtime}</span>  |  <span>{this.state.mdetails.Genre}</span>  |  <span>{this.state.mdetails.Language}</span></p>
            <p className="mb-0 imdbr" style={{color: 'rgb(255, 191, 73)'}}><span style={{fontSize: '45px'}}>{this.state.mdetails.imdbRating}</span>/10<br/>IMDB</p>
            <p className="mb-0 meta" style={{color: 'rgb(255, 191, 73)'}}><span style={{fontSize: '45px'}}>{this.state.mdetails.Metascore}</span>/100<br/>Rotten Tomatoes</p>
        </div>
        <div className="w-75 m-auto py-5">     
            <div className="plot">
                <div className="row">
                    <div className="col-4">
                        <h3>PLOT:</h3>
                    </div>
                    <div className="col-6">
                        <p>
                            {this.state.mdetails.Plot}
                        </p>
                    </div>
                </div>
            </div>
            </div>
            <div className="bg-grey py-5">
            <div className="w-75 m-auto pt-5">
            <div className="crew">
                <div className="row">
                    <div className="col-4"><h3>CREW:</h3></div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-4">
                                <p>Directed by:</p>
                                <p>{this.state.mdetails.Director}</p>
                            </div>
                            <div className="col-4">
                                 <p>Writer</p>
                                <p>{this.state.mdetails.Writer}</p>
                            </div>
                            <div className="col-4">
                                <p>Actors</p>
                                <p>{this.state.mdetails.Actors}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            <div className="w-75 m-auto">
            <div className="exmovies">
                <Exmovie/>
            </div>
            </div>
        </section>
        );
  }
}

export default MovieDetail;