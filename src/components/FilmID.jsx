import React, { useEffect, useState } from "react";
import Like from "../assets/like.svg";
import Disslike from "../assets/disslike.svg";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import "./FilmID.css";
const FilmID = ({ id, title }) => {
	const [filmID, setFilmID] = useState(null);
	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${id}?api_key=101e4f62667bccf1cbfbda8d5a381a88&language=ru-RU&include_image_language=ru,null`
			)
			.then(res => {
				setFilmID(res.data);
			})
			.catch(err => console.error(err));
	}, [id]);
	const [isFavorite, setIsFavorite] = useState(false);

	const addToFavoriteFilms = () => {
		let favoriteFilms = JSON.parse(localStorage.getItem("films"));
		if (!favoriteFilms) favoriteFilms = [];
		favoriteFilms.push({ title: title, id: id });

		localStorage.setItem("films", JSON.stringify(favoriteFilms));
	};

	const removeFavoriteFilms = id => {
		let favoriteFilms = JSON.parse(localStorage.getItem("films"));
		const filtred = favoriteFilms.filter(film => film.id !== id);
		localStorage.setItem("films", JSON.stringify(filtred));
	};

	const runtime = minutes => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		const hoursStr =
			hours === 1
				? "1 час"
				: hours > 1 && hours < 5
				? `${hours} часа`
				: `${hours} часов`;
		const minsStr =
			mins === 1
				? "1 минута"
				: mins > 1 && mins < 5
				? `${mins} минуты`
				: `${mins} минут`;

		return `${hoursStr} ${minsStr}`;
	};
	const productionNames = names => {
		const companies = names.map(company => company.name);
		return companies.join(", ");
	};
	const genreNames = genres => {
		const names = genres.map(genre => genre.name.toLowerCase());
		return names.join(", ");
	};

	if (!setFilmID) return <div>Загрузка данных...</div>;

	return (
		<>
			{!filmID ? (
				<div className="loading">
					Пожалуйста, подождите
					<ClipLoader color="#31B8F7" />
				</div>
			) : (
				<div className="filmID">
					<img
						className="filmID-poster"
						src={
							filmID.poster_path
								? `https://image.tmdb.org/t/p/w500${filmID.poster_path}`
								: "/src/assets/poster_none.png"
						}
						alt="Movie Poster"
					/>

					<div>
						<h4 className="filmID-title">
							<img
								className="button-favorite"
								src={isFavorite ? Disslike : Like}
								onClick={
									!isFavorite
										? () => {
												addToFavoriteFilms();
												setIsFavorite(!isFavorite);
										  }
										: () => {
												removeFavoriteFilms(id);
												setIsFavorite(!isFavorite);
										  }
								}
								alt="Disslike"
								width="25px"
							/>
							{filmID.title}
						</h4>
						<h5 className="filmID-title subtitle">
							В оригинале: {filmID.original_title}
						</h5>
						<p className="filmID-overview">{filmID.overview}</p>
						<p className="text">
							<span>Год выпуска: </span>
							{filmID.release_date?.split("-")[0]}
						</p>
						<p className="text">
							<span>Время: </span>
							{runtime(filmID.runtime)}
						</p>
						<p className="text">
							<span>Жанр: </span>
							{genreNames(filmID.genres)}
						</p>
						<p className="text">
							<span>Бюджет: </span>
							{!filmID.budget ? "неизвестно" : filmID.budget + "$"}
						</p>
						<p className="text">
							<span>Продакшн: </span>
							{productionNames(filmID.production_companies)}
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default FilmID;
