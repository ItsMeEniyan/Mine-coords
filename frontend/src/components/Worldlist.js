import React , {useEffect, useState} from 'react'
import axios from 'axios'
import Worldrender from './Worldrender';


export default function Worldlist() {

    const url= "http://localhost:9000/world";

    const [worlds , getworlds] = useState("");

    useEffect(() =>{
        getallworlds();
    },[]);

    const getallworlds = () => {
        axios.get(`${url}`)
        .then((response) => {
            const allworlds = response.data;
            getworlds(allworlds);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <div>
            <Worldrender worlds={worlds}/>            
        </div>
    )
}
