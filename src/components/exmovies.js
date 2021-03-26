import React from "react";
import { Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore, { Virtual,Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';
SwiperCore.use([Virtual,Navigation]);

class Exmovie extends React.Component {
constructor(props) {
super(props);
this.state = {
emovies:[]
};
}
async componentDidMount() {
let Title = window.location.pathname.split( '/' );
let path = Title[1].substring(0,3);
const apiUrl = `http://www.omdbapi.com/?&apikey=69e759&s=${path}`;
const response = await fetch(apiUrl);
const json = await response.json();
this.setState({ emovies: json.Search });
console.log(this.state.emovies);
}
render() {
return (
<div>
<h1 className="text-left grey py-5">Explore more movies</h1>
    <Swiper slidesPerView={3} spaceBetween={50}
        loop={true} observer={true} navigation>
        {this.state.emovies?.map((k, z) => (
        <SwiperSlide key={z}>
        <Link to={`/${k.Title}`} className="nounderline">
                <div className="card rounded-3">
                    <div className="row">
                        <div className="col-sm-6 pr-4">
                            <img className="d-block w-100" src={k.Poster} alt="poster-img" onError={this.addDefaultSrc} />
                        </div>
                        <div className="col-sm-6">
                            <div className="card-block">
                            <div className="resp-title">
                               <h3>{k.Title.length> 32?k.Title.substr(0,32)+"...":k.Title}</h3>
                               </div>
                                <span>Year</span>
                                <p>{k.Year}</p>
                                <span>Type</span>
                                <p>{k.Type}</p>
                                <span>Imdb Id</span>
                                <p>{k.imdbID}</p>
                                <a href={`movies/${k.Title}`} className="float-right mr-4 mb-2">More</a>
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
        </SwiperSlide>
        ))}
    </Swiper>


</div>

);
}

}
export default Exmovie;