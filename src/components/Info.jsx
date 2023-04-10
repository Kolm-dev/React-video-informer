import React, {useState} from "react"
import ClipLoader from "react-spinners/ClipLoader"
import "./Info.css"

const Info = props => {
	const {results, value, filmID, getInfoID} = props
	const [visible, setVisible] = useState(true)
	const productionNames = names => {
		const companies = names.map(company => company.name)
		return companies.join(", ")
	}

	const genreNames = genres => {
		const names = genres.map(genre => genre.name.toLowerCase())
		return names.join(", ")
	}

	const runtime = minutes => {
		const hours = Math.floor(minutes / 60) // количество целых часов
		const mins = minutes % 60 // остаток от деления на 60 даст количество минут

		// создаем строку в нужном формате, учитывая склонения слов
		const hoursStr =
			hours === 1
				? "1 час"
				: hours > 1 && hours < 5
				? `${hours} часа`
				: `${hours} часов`
		const minsStr =
			mins === 1
				? "1 минута"
				: mins > 1 && mins < 5
				? `${mins} минуты`
				: `${mins} минут`

		return `${hoursStr} ${minsStr}`
	}
	return !value ? (
		<div className="loader">
			<p className="not-film">Введите название фильма...</p>
			<div className="spinner">
				<ClipLoader speedMultiplier={0.4} color="#fff" size={36} />
			</div>
		</div>
	) : (
		<div className="info-component">
			<div style={{display: visible ? "block" : "none"}} className="film-info">
				{results.map(film => {
					return (
						<div className="film" key={film.id}>
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
								<p className="id-text" onClick={e => getInfoID(film.id)}>
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
					)
				})}
				{filmID.title && (
					<>
						<div style={{display: !visible ? "none" : "flex"}} className="film">
							<img
								className="film-image"
								src={
									filmID.poster_path
										? `https://image.tmdb.org/t/p/w500${filmID.poster_path}`
										: "/src/assets/poster_none.png"
								}
								alt="Movie Poster"
							/>

							<div className="text-info">
								<h4>{filmID.title}</h4>
								<h5> В оригинале: {filmID.original_title}</h5>
								<span>{filmID.overview}</span>
								<p>
									<strong>Год выпуска: </strong>
									{filmID.release_date.split("-")[0]}
								</p>
								<p>
									<strong>Время: </strong>
									{runtime(filmID.runtime)}
								</p>
								<p>
									<strong>Жанр: </strong>
									{genreNames(filmID.genres)}
								</p>
								<p>
									<strong>Бюджет: </strong>
									{!filmID.budget ? "неизвестно" : filmID.budget + "$"}
								</p>
								<p>
									<strong>Продакшн: </strong>
									{productionNames(filmID.production_companies)}
								</p>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Info
