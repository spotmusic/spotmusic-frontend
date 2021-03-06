// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

// console.log($REACT_APP_BACKEND_URL);

function App() {
  const [data, setData] = useState([]);
  console.log(process.env.REACT_APP_BACKEND_URL);
  console.log(process.env);
	useEffect(() => {
		fetch("https://backend-fkuvtdnqxq-uc.a.run.app")
		 .then((res) => res.json())
      		 .then((result) => setData(result))
      		 .catch((err) => console.log(err));
	}, []);

  return (
    <div className="divTable">
      {data &&
        data.map((element) => (
        <div className="headRow" key={element.song_id}>
          <div className="divCell" align="center">{element.song_id}</div>
          <div className="divCell divCellName">{element.title}</div>
          <div className="divCell divCellName">{element.artist}</div>
          <div className="divCell" align="center">{element.genre}</div>
          </div>
        ))}
    </div>
  );

}

export default App;
