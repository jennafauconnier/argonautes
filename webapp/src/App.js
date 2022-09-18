import { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

function App() {
  const [argos, setArgos] = useState([]);
  const [newArgo, setNewArgo] = useState("");

  useEffect(() => {
    GetArgos();
  }, []);

  const GetArgos = () => {
    fetch("http://localhost:8080/argos")
      .then((res) => res.json())
      .then((data) => setArgos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const addArgo = async () => {
    const data = await fetch("http://localhost:8080/argos/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        argo: newArgo
      })
    }).then((res) => res.json());

    setArgos([...argos, data]);

    setNewArgo("");
  };

  return (
    <Container>
      <h1>Ajouter un(e) Argonaute</h1>

      <h2>Nom de l'argonaute</h2>

      <div className="input_container">
        <input
          placeholder="Argonaute"
          onChange={(e) => setNewArgo(e.target.value)}
          value={newArgo}
        />
        <Button onClick={addArgo}>Envoyer</Button>
      </div>

      <ListContainerNames>
        {argos.length > 0 ? (
          argos.map((argo) => (
            <div key={argo._id}>
              <p>{argo.argo}</p>
            </div>
          ))
        ) : (
          <p>0 argonautes</p>
        )}
      </ListContainerNames>
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  height: 600px;
  width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f76c6c;
  border-radius: 18px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .input_container {
    display: flex;
    flex-direction: row;
    padding-bottom: 50px;
  }
`;

const Button = styled.button`
  margin-left: 10px;
  cursor: pointer;
  position: relative;
  outline: none;
  border: none;
  text-decoration: none;
  box-sizing: border-box;
  color: red;
  background-color: #ffffff;
  display: flex;
  align-items: center;

  justify-content: center;

  transition: opacity 0.2s ease-out;
  height: 25px;
  width: 80px;
  border-radius: 5px;
  font-size: 14px;
`;

const ListContainerNames = styled.div`
  color: #fff;
  font-size: 15px;
`;
