import React from 'react'
import "./Worldrender.css"

export default function Worldrender(props) {
    //console.log(props.worlds)
    
    const displayworlds = (props) => {
        const {worlds}=props;

        if (worlds.length>0){
            return(
                worlds.map((world, index)=> {
                    console.log.apply(world);
                    return(
                        <div className='world' key={world._id}>
                        <h3 className="world_name">
                            {world.worldname}
                        </h3>

                        </div>
                    )
                })
            )
        }
        else{
            return(<h3>World is not created yet</h3>)
        }
    }

    return (
        <div>
        {displayworlds(props)}
            
        </div>
    )
}
