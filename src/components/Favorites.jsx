import React from "react";
import "./Favorites.css";
const Favorites = ({ favorites }) => {
	return (
		<div className="favorites">
			Любимые фильмы
			{favorites.map(film => {
				return (
					<p key={film.id}>
						{`${film.title}
						ID:${film.id}`}
						<hr />
					</p>
				);
			})}
		</div>
	);
};

export default Favorites;
