
import React, { useEffect, useState } from 'react'
import axios from "axios"

const Personas = (props) => {

    const [personas, setPersonas]= useState({});
    const [error, setError]= useState(false);

    useEffect(() => {
        axios.get("https://swapi.dev/api/people/" + props.match.params.id )
            .then(response => response.data)
            .then(result =>{
                console.log(result);
                setPersonas(result);
                setError(false);
            })
            .catch(error => {
                console.log(error);
                setError(true);
            })
    })

    return (
    <>
        <h1>Ruta personas {props.match.params.id}</h1>
        {
        error?
        "imprimir error"
        :
        "imprimir informacion"
        }
    </>
    )
}

export default Personas