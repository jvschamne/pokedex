import Card from "./Card"
import './CardsContainer.css'
import { useState, useEffect } from "react"

const CardsContainer = () => {

    const [pokemons, setPokemons] = useState([])
    const [changer, setChange] = useState(0)
    let auxPokemon = []



    useEffect(() => { 
        const data = localStorage.getItem('pokemons')
        /*if(data){
                console.log('k')
                setPokemons(JSON.parse(data))
        }
        else{*/
                fetchPoke()
                console.log('Pokemons salvos!')
                //localStorage.setItem('pokemons', JSON.stringify(auxPokemon))
                console.log('Pokemons:', pokemons)
        //}

    }, [changer])

    useEffect(() => {
        console.log('UPDATE')
        if(pokemons.length >= 100) localStorage.setItem("pokemons", JSON.stringify(pokemons));
    }, [pokemons]);
      
 
        
    function formatText(text){
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    function formatNumber(number) {
        return "#" + number.toString().padStart(4, "0");
    }

    function handlePokeTypes(types){
        let pokeTypes = []
        for(let i=0; i<types.length; i++){
            let newType = formatText(types[i]["type"]["name"])
            pokeTypes.push(newType)
        }    
        return pokeTypes
    }

    function checkDuplicate(order){
        for(let j=0; j<auxPokemon.length; j++){
            if(auxPokemon[j]["order"] == order){
                return false
            }
        } 
        return true   
    }

    function getPokeInfo(index, url) {
        fetch(url)
          .then(response => response.json())
          .then(pokeInfo => {
            if (index < 150) {
              let order = index + 1;
              let name = formatText(pokeInfo["name"]);
              let image = pokeInfo["sprites"]["front_default"];
              let types = handlePokeTypes(pokeInfo["types"]);


              if(checkDuplicate(order)){
                let newPokemon = { order, name, image, types }
                auxPokemon.push(newPokemon)
                setPokemons(auxPokemon)
              }
            }
          });
      }


    const savePokemons = (pokeResult) => {
        if (changer === 0) {
          let promises = [];
          for (let i = 0; i < pokeResult.length; i++) {
            let promise = getPokeInfo(i, pokeResult[i]["url"]);
            promises.push(promise);
          }
          Promise.all(promises).then(() => {
            let sortedPokemons = [...pokemons].sort((a, b) => a.order - b.order);
            setPokemons(sortedPokemons);
          });
        }
        setChange(changer + 1);
      };
    

    const fetchPoke = () => {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=150"
        fetch(url)
        .then(response => response.json())
        .then(pokeInfo => savePokemons(pokeInfo["results"]))
    }

    return(
        <div className="CardsContainer">
            {/*pokemons.length > 0 &&
            pokemons.map(([order, name, image, types]) => (
                <Card code={order} name={name} image={image} types={types}/>
            ))*/}
            {pokemons.length > 0 &&
      pokemons.map(({ order, name, image, types }) => (
        <Card key={order} code={formatNumber(order)} name={name} image={image} types={types} />
      ))}
            
        </div>
    )
    
} 

export default CardsContainer 