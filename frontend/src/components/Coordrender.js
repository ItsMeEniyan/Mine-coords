import React, {/* useState */} from "react";
//import Modal from "react-modal";
import "./Worldrender.css";
//import axios from "axios";
//import {useHistory} from "react-router-dom";

export default function Coordender(props) {
  //console.log(props.worlds)

  //let history = useHistory();

  //const [ModalIsOpen, setModalIsOpen] = useState(false);

  //const [changename, setchangename] = useState("");
  //const [currentworldid, setcurrentworldid] = useState("");
  

  //const url = "http://localhost:9000/world";

  /*const deleteWorld = (_id, e) => {
    axios.delete(`${url}/deleteworld`, { data: { worldid: _id } });
    props.deleteworldparent(_id)
  };*/
  /*{const editWorld = (_id,e) => {
         axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
        }}*/
  /*const handlesubmit = () => {
    axios.patch(`${url}/editworld`, { worldid: currentworldid, worldname: changename });
    console.log(currentworldid);
    //axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
  };*/

  const displaycoords = () => {
    const  coords  = props.coords;
    //const {deleteworldparent} = props;
    //console.log(coords);

    if (coords.coords && coords.coords.length > 0) {
      return (
        <>
          {coords.coords.map((coord, index) => {
            console.log.apply(coord);
            return (
              <div className="world" key={coord._id} /*{onClick={()=>history.push(`/coords/${world._id}`)}}*/>
                <h3 className="world_name">{coord.coordname}</h3>
                <div className="coords">
                <h3 className="world_name">X: {coord.coord.x}</h3>
                <h3 className="world_name">Y: {coord.coord.y}</h3>
                </div>
                {/*<button onClick={(e) => {setModalIsOpen(true);e.stopPropagation(); setcurrentworldid(world._id)}}>Edit</button>
                <button onClick={(e) => {deleteWorld(world._id, e) ;e.stopPropagation();}}>
                  Delete
                </button>*/}
              </div>
            );
          })}
          {/*<Modal
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
          </Modal>*/}
        </>
      );
    } else {
      return <h3>co-ordinates are not created yet</h3>;
    }
  };

  return <div>{displaycoords()}</div>;
}
