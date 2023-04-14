import axios from "axios"
import React, { useEffect, useState } from "react"
import "./App.css"
import Info from "./components/Info"
import Button from './assets/button.svg'
import Favorites from "./components/Favorites"
function App() {
	const [film, setFilm] = useState([])
	const [visible, setVisible] = useState(true)
	const [value, setValue] = useState()
	const [favorites, setFavorite] = useState([])

	const inputHandler = (e) => {
		setValue(e.target.value)
	}
	const URL = `https://api.themoviedb.org/3/search/movie?api_key=101e4f62667bccf1cbfbda8d5a381a88&query=${value}&language=ru-RU&include_image_language=ru,null`
	const getInfo = () =>
	setVisible(!visible)
	axios
	.get(
		URL
		)
		.then(res => setFilm(res.data.results))
		.catch(e => console.error(e))
		

		useEffect(() => {
			const dataFromLocalStorage = localStorage.getItem("films")
			if (dataFromLocalStorage) {
				setFavorite(JSON.parse(dataFromLocalStorage))
			}
		}, [])



	return (
		<>
			<div className="wrapper">
				<div className="app">
					<h1>Video Informer</h1>
					<div>
						<input
						onChange={inputHandler}
							className="search-input"
							placeholder="Введите фильм, который хотите найти?"
							type="text"
							name="search"
							id="search"
						/>
						<button className="button-search" onClick={getInfo}> <img className="button-image" width="20px" src={Button} alt="button" /> Показать</button>
					</div>
						<Favorites favorites={favorites} setFavorite={setFavorite}/>
				</div>
				<Info visible={visible} setVisible={setVisible} getInfo={getInfo} value={value} results={...film }/>
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
