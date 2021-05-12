import React, { useState } from "react";
import Modal from "react-modal";
import "./Worldrender.css";
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function Worldrender(props) {
  //console.log(props.worlds)

  let history = useHistory();

  const [ModalIsOpen, setModalIsOpen] = useState(false);

  const [changename, setchangename] = useState("");
  const [currentworldid, setcurrentworldid] = useState("");
  

  const url = "http://localhost:9000/world";

  const deleteWorld = (_id, e) => {
    axios.delete(`${url}/deleteworld`, { data: { worldid: _id } });
    props.deleteworldparent(_id)
  };
  /*{const editWorld = (_id,e) => {
         axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
        }}*/
  const handlesubmit = () => {
    axios.patch(`${url}/editworld`, { worldid: currentworldid, worldname: changename });
    console.log(currentworldid);
    //axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
  };

  const displayworlds = (props) => {
    const  worlds  = props.worlds;
    //const {deleteworldparent} = props;

    if (worlds.length > 0) {
      return (
        <>
          {worlds.map((world, index) => {
            console.log.apply(world);
            return (
              <div className="world" key={world._id} onClick={()=>history.push("/coord")}>
                <h3 className="world_name">{world.worldname}</h3>

                <button onClick={(e) => {setModalIsOpen(true);e.stopPropagation(); setcurrentworldid(world._id)}}>Edit</button>
                <button onClick={(e) => {deleteWorld(world._id, e) ;e.stopPropagation();}}>
                  Delete
                </button>
              </div>
            );
          })}
          <Modal
            isOpen={ModalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
          >
            <form onSubmit={() => handlesubmit()}>
              <label>World Name:</label>
              <input
                type="text"
                required
                value={changename}
                onChange={(e) => setchangename(e.target.value)}
              />
              <button>Change World Name</button>
            </form>
          </Modal>
        </>
      );
    } else {
      return <h3>World is not created yet</h3>;
    }
  };

  return <div>{displayworlds(props)}</div>;
}