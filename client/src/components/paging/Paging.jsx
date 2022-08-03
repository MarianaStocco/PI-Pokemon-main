import React from "react";
import styles from "./styles.module.css"


//declaro paginado y traigo propiedades del componente home
export default function Paging ({currentPage, pokemonPerPage, allPokemon, paging}){
    const pageNumbers = []; // arreglo vacío, que terminará siendo un arreglo de números del resultado del ciclo for.

    // recorro el arreglo que resulta de dividir todos los pokemon por la cantidad
    // de Pokemon por página y los agrego al arreglo vacío.
    for (let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage) ; i++) {
        pageNumbers.push(i)        
    }
    return (
                //mapear el arreglo y devolver el número correspondiente
        <nav className={styles.paginate}>
                {pageNumbers && pageNumbers.map((number, index) =>{
                    return (
                  <div key={index} className={styles.item}>
                      <button className={styles.btn} onClick={()=> paging(number)}>{number}</button>
                  </div>
                    )
                })}
        </nav>
    )
}


























// return (
//     <div>
//         <nav>
//             {currentPage !== 1 ? (
//                 <button
//                 onClick={() => paging(-1)}
//                 >
//                     PREV
//                 </button>
//             ) : (
//                 <span></span>
//             )}
//             <p>{currentPage}</p>
//             {currentPage !== pageNumbers.length ? (
//                 <button
//                 onClick={() => paging(1)}
//                 >
//                     NEXT
//                 </button>
//             ) : (
//                 <span></span>
//             )}
//         </nav>
//     </div>
// )
