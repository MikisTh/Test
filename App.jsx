import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterBook = () => {
    Axios.post("http://localhost:3001/register", {
      titulo: values.titulo,
      autor: values.autor,
      genero: values.genero,
      ISBN: values.ISBN,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        titulo: values.titulo,
        autor: values.autor,
        genero: values.genero,
        ISBN: values.ISBN,

      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            titulo: values.titulo,
            autor: values.autor,
            genero: values.genero,
            ISBN: values.ISBN,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">BIBLIOTECA</h1>

        <input
          type="text"
          name="titulo"
          placeholder=" Título"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder=" Autor"
          name="autor"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder=" Gênero"
          name="genero"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder=" ISBN"
          name="ISBN"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterBook} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          titulo={val.titulo}
          autor={val.autor}
          genero={val.genero}
          ISBN={val.ISBN}
        />
      ))}
    </div>
  );
}