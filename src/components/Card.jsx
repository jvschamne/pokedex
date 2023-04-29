import { useEffect, useState } from 'react'
import './Card.css'

const Card = ({key, code, name, image, types}) => {

    const [init, setInit] = useState(false)

    useEffect(() => {
        if(init == false){
            const thisCard = document.getElementById(code)
            const spanTypes = thisCard.childNodes[3].childNodes
            for(let i=0; i<spanTypes.length; i++){
                spanTypes[i].classList.add(types[i])
            }
            setInit(true)
        }
    }, [])
  
    return(
        <div id={code} className="Card">   
                <img src={image}/>
                <h1>{code}</h1>
                <h1>{name}</h1>
                <div className="types">
                    {
                        types.map((type) => (
                            <span className='type'>{type}</span>
                        ))
                    }
                </div>
                
        </div>
    )

}

export default Card