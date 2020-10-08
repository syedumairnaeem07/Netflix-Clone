import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

	useEffect(() => {
		//If we use a variable that is outside the Block scope of useEffect than we must write
		//it into the second argument of useEffect in order to add dependency so that whenever
		//that variable changes useEffect fires the code again
		async function fetchData() {
			const request = await axios.get(fetchURL);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchURL]);

	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
        console.log(movie.name);
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
				.then((url) => {
					//https://www.youtube.com/watch?v=jGoGg2bE9ng
					//we need to get the value(v) from the url. will do the following to achieve that
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log(url);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<div className="row">
			<h2>{title}</h2>
			<div className="row__posters">
				{movies.map((movie) => (
					<img
						key={movie.id} //optimization so that react knows what exactly is to be rendered instead of rendering the whole posters
						onClick={() => handleClick(movie)}
						className={`row__poster ${
							isLargeRow && "row__posterLarge"
						}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
					/>
				))}
			</div>
			{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;
