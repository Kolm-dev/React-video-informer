import axios from "axios"
import React, { useState } from "react"
import "./App.css"
import Info from "./components/Info"
function App() {
	const [film, setFilm] = useState([])
	const [filmID, setFilmID] = useState({})
	const [value, setValue] = useState('')
	const inputHandler = (e) => {
		setValue(e.target.value)
		value.replace(/\s/g, "+")
	}
	const URL = `https://api.themoviedb.org/3/search/movie?api_key=101e4f62667bccf1cbfbda8d5a381a88&query=${value}&language=ru-RU&include_image_language=ru,null`
	const getInfo = () =>
	axios
	.get(
		URL
		)
		.then(res => setFilm(res.data.results))
		.catch(e => console.error(e))
		
	const getInfoID = (id) => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${id}?api_key=101e4f62667bccf1cbfbda8d5a381a88&language=ru-RU&include_image_language=ru,null`
			)
			.then(res => {setFilmID(res.data)
			setFilm([])})
			.catch(err => console.error(err))
		}


	return (
		<>
			<div className="wrapper">
				<div className="app">
					<h1>Video Informer</h1>
					<div>
						<input
						value={value}
						onChange={inputHandler}
							className="search-input"
							placeholder="Введите фильм, который хотите найти?"
							type="text"
							name="search"
							id="search"
						/>
						<button onClick={getInfo}>Поиск</button>
					</div>
				</div>
				<Info filmID={filmID} getInfoID={getInfoID} getInfo={getInfo} value={value} results={...film }/>
			</div>
			<div className="footer">
				<a target="_blank" href="https://github.com/Kolm-dev">
					<img
						className="git-url"
						src="../src/assets/github.jpg"
						alt="author github"
					/>
				</a>
			</div>
		</>
	)
}

export default App
