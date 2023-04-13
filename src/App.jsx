import axios from "axios"
import React, { useState } from "react"
import "./App.css"
import Info from "./components/Info"
import Button from './assets/button.svg'
function App() {
	const [film, setFilm] = useState([])
	const [visible, setVisible] = useState(true)
	const [value, setValue] = useState()
	const inputHandler = (e) => {
		setValue(e.target.value)
		value.replace(/\s/g, "+")
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
						<button onClick={getInfo}> <img className="button-image" width="20px" src={Button} alt="button" /> Показать</button>
					</div>
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
