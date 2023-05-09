import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Info.css";
import FilmID from "./FilmID";

const Info = props => {
	const { results, value, visible, setVisible } = props;
	const [idInfo, setIDInfo] = useState();
	return !value ? (
		<div className="loader">
			<p className="not-film">Введите название фильма...</p>
			<div className="spinner">
				<ClipLoader
					speedMultiplier={0.4}
					color="#fff"
					size={36}
				/>
			</div>
		</div>
	) : (
		<div className="info-component">
			<div className="film-info">
				{visible ? (
					results.map(film => {
						return (
							<div
								className="film"
								key={film.id}>
								<img
									className="film-image"
									src={
										film.poster_path
											? `https://image.tmdb.org/t/p/w500${film.poster_path}`
											: "/src/assets/poster_none.png"
									}
									alt="Movie Poster"
								/>

								<div className="text-info">
									<h2 className="movie-title">{film.original_title}</h2>
									<p
										className="id-text"
										onClick={() => {
											setVisible(!visible);
											setIDInfo({ id: film.id, title: film.original_title });
										}}>
										<strong>ID:</strong> {film.id}
									</p>
									<p className="movie-description">{film.overview}</p>

									<p>
										<strong>Дата релиза:</strong> {film.release_date}
									</p>

									<p>
										<strong>Продолжительность:</strong> 87 мин.
									</p>
									<p>
										<strong>Режиссёр:</strong> Дилан Вокс
									</p>
								</div>
							</div>
						);
					})
				) : (
					<FilmID
						id={idInfo.id}
						title={idInfo.title}
						setVisible={setVisible}
					/>
				)}
			</div>
		</div>
	);
};

export default Info;
