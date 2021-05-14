import React, { useState } from "react";
import Modal from "react-modal";
import "./Worldrender.css";
import axios from "axios";
//import {useHistory} from "react-router-dom";

export default function Coordender(props) {
  //console.log(props.worlds)

  //let history = useHistory();

  const [ModalIsOpen, setModalIsOpen] = useState(false);

  const [coordname, setcoordname] = useState("");
  const [x, setx] = useState("");
  const [y, sety] = useState("");
  const [currentcoordid, setcurrentcoordid] = useState("");

  const url = "http://localhost:9000/world";

  const deletecoord = (_id, e) => {
    axios.delete(`${url}/deletecoord`, { data: { worldid: props.id ,coordid : _id} });
    props.deletecoordparent(_id);
  };
  /*const editWorld = (_id, e) => {
    axios.patch(`${url}/editworld`, {
      data: { worldid: _id, worldname: changename },
    });
  };*/
  const handlesubmit = (e) => {
    axios.patch(`${url}/editcoord`, {
      worldid: props.id,
      coordname: coordname,
      coordid: currentcoordid,
      x:x,
      y:y
    });
    console.log(props.id,coordname,currentcoordid,x,y);
    props.editcoordparent(currentcoordid,coordname,x,y);
    e.preventDefault();
    setModalIsOpen(false);
    setcoordname("");
    setx("");
    sety("");

    //axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
  };

  const displaycoords = () => {
    const coords = props.coords;
   // const { deletecoordparent() } = props;
    //console.log(coords);

    if (coords.coords && coords.coords.length > 0) {
      return (
        <>
          {coords.coords.map((coord, index) => {
            console.log.apply(coord);
            return (
              <div
                className="world"
                key={
                  coord._id
                } /*{onClick={()=>history.push(`/coords/${world._id}`)}}*/
              >
                <h3 className="world_name">{coord.coordname}</h3>
                <div className="coords">
                  <h3 className="world_name">X: {coord.coord.x}</h3>
                  <h3 className="world_name">Y: {coord.coord.y}</h3>
                </div>
                <button
                  onClick={(e) => {
                    setModalIsOpen(true);
                    e.stopPropagation();
                    setcurrentcoordid(coord._id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    deletecoord(coord._id, e);
                    e.stopPropagation();
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <Modal
            isOpen={ModalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
          >
            <form onSubmit={(e) => handlesubmit(e)}>
              <label>Coord Name:</label>
              <input
                type="text"
                required
                value={coordname}
                onChange={(e) => setcoordname(e.target.value)}
              />

              <label>X:</label>
              <input
                type="number"
                required
                value={x}
                onChange={(e) => setx(e.target.value)}
              />

              <label>Y:</label>
              <input
                type="number"
                required
                value={y}
                onChange={(e) => sety(e.target.value)}
              />
              <button>Edit coords</button>
            </form>
          </Modal>
        </>
      );
    } else {
      return <h3>co-ordinates are not created yet</h3>;
    }
  };

  return <div>{displaycoords()}</div>;
}
