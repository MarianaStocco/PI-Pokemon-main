import React from "react";


//declaro paginado y traigo propiedades del componente home
export default function Paging ({pokemonPerPage, allPokemon, paging}){
    const pageNumbers = []; // arreglo vacío, que terminará siendo un arreglo de números del resultado del ciclo for.

    // recorro el arreglo que resulta de dividir todos los pokemon por la cantidad
    // de Pokemon por página y los agrego al arreglo vacío.
    for (let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage) ; i++) {
        pageNumbers.push(i)        
    }
    return (
                //mapear el arreglo y devolver el número correspondiente
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map((number, index) =>{
                    return (
                  <div key={index}>
                      <button onClick={()=> paging(number)}>{number}</button>
                  </div>
                    )
                })}
            </ul>
        </nav>
    )
}