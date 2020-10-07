import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
	const [movies, setMovies] = useState([]);

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

	return (
		<div className="row">
			<h2>{title}</h2>
			<div className="row__posters">
				{movies.map((movie) => (
					<img
						key={movie.id} //optimization so that react knows what exactly is to be rendered instead of rendering the whole posters
						className={`row__poster ${isLargeRow && "row__posterLarge"}`}
						src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`}
						alt={movie.name}
					/>
				))}
			</div>
		</div>
	);
}

export default Row;
