import React, { useEffect, useState, useRef } from "react";

export function Home() {

	const [playlist, setPlaylist] = useState([]);
	useEffect(() => {
		songList();
	}, []);

	const songList = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => setPlaylist(data));
	};


	const [currentSong, setCurrentSong] = useState(0);


	const [playBtn, setBtn] = useState("play");

	const audio = useRef();


	async function playSong() {
		audio.current.pause();

		audio.current.src =
			"https://assets.breatheco.de/apis/sound/" + currentSong.url;
		await audio.current.play();
		const newId = currentSong.id + 1;


		(await audio.current.ended) == true
			? setCurrentSong(playlist[newId])
			: "";
		console.log("Im the current song " + currentSong);
		setBtn("pause");
	}



	function toggleBtn() {
		playBtn == "play" ? setBtn("pause") : setBtn("play");
		playBtn == "play" ? audio.current.play() : audio.current.pause();
	}

	return (
		<>
			{/* Songlist */}
			<div id="MusicPlayer">
				<table className="table table-hover table-dark text-white-50">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Title</th>
							<th scope="col">Category</th>
						</tr>
					</thead>
					<tbody>
						{playlist.length > 0 &&
							playlist.map((song, index) => {
								return (
									<tr
										key={song.id}
										onClick={() => {
											setCurrentSong({
												indice: index,
												...song
											});
											playSong();
										}}>
										<th scope="row">{index + 1}</th>
										<td>
											<i className="fas fa-headphones-alt"></i>
											{song.name}
											<audio ref={audio} />
										</td>
										<td>{song.category || song.game}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>

			{/* Botones */}
			<div id="PlayBar">
				<div className="playBar d-flex justify-content-center">
					<div className="row p-1 align-items-center">
						<a
							onClick={() => {
								setCurrentSong({
									indice: parseInt(currentSong.indice) - 1,
									...playlist[
										parseInt(currentSong.indice) - 1
									]
								});
								playSong();
							}}>
							<i className="fas fa-step-backward"></i>
						</a>

						<i
							className={
								"fas " +
								(playBtn == "pause"
									? "fa-pause-circle"
									: "fa-play-circle")
							}
							onClick={() => {
								toggleBtn();
							}}
							role="button"></i>
						<a
							onClick={() => {
								setCurrentSong({
									indice: parseInt(currentSong.indice) + 1,
									...playlist[
										parseInt(currentSong.indice) + 1
									]
								});
								playSong();
							}}>
							<i className="fas fa-step-forward"></i>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
