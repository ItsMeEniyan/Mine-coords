import React from "react";
import "./Coordlist.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Coordrender from "./Coordrender";
import Modal from "react-modal";

export default function Coordlist() {
  const url = "http://localhost:9000/world";
  const { id } = useParams();
  
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [coords, getcoords] = useState("");
  const [coordname, setcoordname] = useState("");
  const [x, setx] = useState("");
  const [y, sety] = useState("");

  useEffect(() => {
    getallcoords();
  },[]);

  const getallcoords = () => {
    axios
      .get(`${url}/coord`, {
        params: 
          { worldid:id }
        })
      .then((response) => {
        const allcoords = response.data;
        getcoords(allcoords);
        //console.log(coords);

      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const handlesubmit = (e) => {
    axios.put(`${url}/addcoord`, { worldid: id ,coordname: coordname, x:x, y:y}).then((response)=>
    {
      //const newcoord= {"coordname": coordname , "_id": response.data, "coord":{"x":x,"y":y}};
      const newcoord= response.data;

      const copycoord = Object.assign([],coords)
      copycoord.push(newcoord)
      getcoords(copycoord)
      console.log(coords);
    });
    setModalIsOpen(false);
    e.preventDefault();

    //axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Add New Coordinates</button>
      <Modal isOpen={ModalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={(e)=>handlesubmit(e)}>
          <label>World Name:</label>
          <input
            type="text"
            required
            value={coordname}
            onChange={(e) => setcoordname(e.target.value)}
          />
          
          <label>X:</label>
          <input
            type="text"
            required
            value={x}
            onChange={(e) => setx(e.target.value)}
          />
          
          <label>Y:</label>
          <input
            type="text"
            required
            value={y}
            onChange={(e) => sety(e.target.value)}
          />
          <button>Add new Coordinates</button>
        </form>
      </Modal>
      {/*deletecoordparent={deletecoordparent}*/}
      <Coordrender coords={coords} />
    </div>
  );
}
