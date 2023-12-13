import { useState } from 'react';

import { SlMagicWand } from "react-icons/sl";
import './styles.css';

import api from './services/api';


function App() {

  const [input, setInput] = useState ('');

  const [cep, setCep] = useState ({})

  async function handleSearch(){
    //01001000/json/

    if (input === ''){
      alert("Preencha o CEP.")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')
    } catch (error){
      alert("Erro ao localizar o CEP.");
      setInput('')
     
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1> 

      <div className="containerInput">
      <input
      type="text"
      placeholder="Insira o CEP" 
      value={input}
      maxLength={8}
      onChange={(e) =>setInput(e.target.value) }
      />



      <button className="button" onClick={handleSearch}>
      <SlMagicWand size={22} color="#F2C572"/>
      </button>

      </div>

      {Object.keys(cep).length > 0 && (

  <main className="main">
  <h2>Cep: {cep.cep}</h2>
  <span> {cep.logradouro}</span>
  <span>Complemento: {cep.complemento}</span>
  <span>{cep.bairro}</span>
  <span>{cep.localidade} - {cep.uf}</span>


</main>
      )}



    </div>
  );
}

export default App;

