
import React, { useEffect, useState } from 'react'
import axios from "axios"


const Principal = () => {
    const [opciones, setOpcioes]= useState([]);
    const [selected, setSelected]= useState("");
    const [id, setId]= useState("1");
    const [error, setError]= useState(false);
    const [reslt, setReslt]= useState({});
    

    useEffect(() =>{
        axios.get("https://swapi.dev/api/")
            .then(response => response.data)
            .then(result =>{
                console.log(result);

                let resList = [];

                for (const[ key, value] of Object.entries(result)){
                    resList.push({label: key, url: value});
                }

                console.log(resList);
                setOpcioes(resList);
                setSelected(resList[0].url)
                
            })
            .catch(error =>{
                console.log(error);
            })
    }, [])

    useEffect(() =>{
        console.log(selected);
    }, [selected])

    const handleSearch = (e) => {
        e.preventDefault();
        let url= selected + id
        axios.get(url)
            .then(response => response.data)
            .then(result => {
                setError(false);
                console.log(result);
                if (selected.includes("People")){
                    console.log(result.homeworld);
                    axios.get(result.homeworld)
                    .then(resp => resp.data)
                    .then(res => {
                        console.log(res);
                        result.planet = res;
                        console.log(result);
                        setReslt(result);
                    })
                    .catch(err =>{
                        console.log(err);
                    })
                    
                }
                else{
                    setReslt(result);
                }

            })
            .catch(error => {
                console.log(error);
                setError(true);
            })
    }

    return (
    <>
        <h1>Ruta principal</h1>
        <form onSubmit={handleSearch}>

            <select selected={selected} onChange={(e) => setSelected(e.target.value)} className="People">
                {
                    opciones.map((item, index) =>
                        <option key={item.label + index} value={item.url}>{item.label}</option>)
                }
            </select>

            <label>Id:</label>
            <input className='Id' type="number" value={id} onChange={(e) => setId(e.target.value)}/>

            <button type="submit" className='Search'>Buscar</button>
            {
                error?
                <div>
                    <p>"Estos no son los droides que está buscando"</p>
                    <img src='/img/ObiWan.jpg' alt='imagen de error'/>
                </div>
                
                :
                null
            }
            {
                reslt.name?<h2>Nombre: {reslt.name}</h2>
                :
                null
            }

            {
                reslt.height?<h2>Heigth: {reslt.height}</h2>
                :
                null
            }
            {
                reslt.skin_color?<h2>Skin color: {reslt.skin_color}</h2>
                :
                null
            }
            {
                reslt.hair_color?<h2>Hair color: {reslt.hair_color}</h2>
                :
                null
            }
            {
                reslt.rotation_period?<h2>Rotation period: {reslt.rotation_period}</h2>
                :
                null
            }
            {
                reslt.title?<h2>Title: {reslt.title}</h2>
                :
                null
            }
            {
                reslt.director?<h2> Director: {reslt.director}</h2>
                :
                null
            }
            {
                reslt.classification?<h2> Classification: {reslt.classification}</h2>
                :
                null
            }
            {
                reslt.manufacturer?<h2> Manufacturer: {reslt.manufacturer}</h2>
                :
                null
            }
        </form>
    </>
    )
}

export default Principal