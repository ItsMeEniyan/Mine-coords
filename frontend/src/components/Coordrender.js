import React, { useState } from "react";
import Modal from "react-modal";
import "./Coordrender.css";
import "./modal-for-coords.css";
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

  const url = `${process.env.REACT_APP_SERVER_URL}/world`;

  const deletecoord = (_id, e) => {
    axios.delete(`${url}/deletecoord`, {
      data: { worldid: props.id, coordid: _id },
    });
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
      x: x,
      y: y,
    });
    console.log(props.id, coordname, currentcoordid, x, y);
    props.editcoordparent(currentcoordid, coordname, x, y);
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
          <div className="coord-container">
            {coords.coords.map((coord, index) => {
              console.log.apply(coord);
              return (
                <div
                  className="coord"
                  key={
                    coord._id
                  } /*{onClick={()=>history.push(`/coords/${world._id}`)}}*/
                >
                  <h3 className="coord_name">{coord.coordname}</h3>
                  <div className="coords">
                    <h3 className="coords-x">X: {coord.coord.x}</h3>
                    <h3 className="coords-y">Y: {coord.coord.y}</h3>
                  </div>
                  <div className="coord-button-set">
                    <div
                      className="coord-edit-button"
                      onClick={(e) => {
                        setModalIsOpen(true);
                        e.stopPropagation();
                        setcurrentcoordid(coord._id);
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className="coord-delete-button"
                      onClick={(e) => {
                        deletecoord(coord._id, e);
                        e.stopPropagation();
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
            <Modal
              className="coord-modal"
              isOpen={ModalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <div className="coord-padding">
                <form onSubmit={(e) => handlesubmit(e)}>
                  <label>Enter Coordinates Name</label>
                  <input
                    type="text"
                    maxLength="25"
                    required
                    value={coordname}
                    onChange={(e) => setcoordname(e.target.value)}
                  />

                  <label>X-Coordinates</label>
                  <input
                    type="number"
                    required
                    value={x}
                    onChange={(e) => setx(e.target.value)}
                  />

                  <label>Y-Coordinates</label>
                  <input
                    type="number"
                    required
                    value={y}
                    onChange={(e) => sety(e.target.value)}
                  />
                  <button>Edit coords</button>
                </form>
              </div>
            </Modal>
          </div>
        </>
      );
    } else {
      return <h3>co-ordinates are not created yet</h3>;
    }
  };

  return <div>{displaycoords()}</div>;
}
