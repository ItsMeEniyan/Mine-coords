import React from "react";
import "./Coordlist.css";
import "./modal-for-coords.css";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Coordrender from "./Coordrender";
import Modal from "react-modal";

export default function Coordlist() {
  const url = `${process.env.REACT_APP_SERVER_URL}/world`;
  const { id } = useParams();

  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [coords, getcoords] = useState("");
  const [coordname, setcoordname] = useState("");
  const [x, setx] = useState("");
  const [y, sety] = useState("");

  let history = useHistory();

  useEffect(() => {
    getallcoords();
  }, []);

  const getallcoords = () => {
    axios
      .get(`${url}/coord`, {
        params: { worldid: id },
      })
      .then((response) => {
        const allcoords = response.data;
        getcoords(allcoords);
        //console.log(coords);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const deletecoordparent = (coordid) => {
    const copycoord = Object.assign([], coords);
    const thatcoordindex = copycoord.coords.findIndex((x) => {
      return x._id === coordid;
    });
    copycoord.coords.splice(thatcoordindex, 1);
    console.log(copycoord);
    getcoords(copycoord);
    console.log(coords);
  };

  const editcoordparent = (thatcoordid, newcoordname, newx, newy) => {
    const copycoord = Object.assign([], coords);
    const thatcoordindex = copycoord.coords.findIndex((x) => {
      return x._id === thatcoordid;
    });
    copycoord.coords[thatcoordindex].coordname = newcoordname;
    copycoord.coords[thatcoordindex].coord.x = newx;
    copycoord.coords[thatcoordindex].coord.y = newy;
    getcoords(copycoord);
  };

  const handlesubmit = (e) => {
    axios
      .put(`${url}/addcoord`, { worldid: id, coordname: coordname, x: x, y: y })
      .then((response) => {
        const newcoord = {
          coordname: coordname,
          _id: response.data,
          coord: { x: x, y: y },
        };
        //const newcoord= response.data;

        const copycoord = Object.assign([], coords);
        copycoord.coords.push(newcoord);
        getcoords(copycoord);
        console.log(coords);
      });
    setModalIsOpen(false);
    e.preventDefault();
    setcoordname("");
    setx("");
    sety("");

    //axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
  };

  return (
    <div>
      <div className="coordnav">
        <div className="back-button" onClick={() => history.goBack()}></div>
        <div> {coords.worldname}</div>
      </div>
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

            <label>X-coordinates</label>
            <input
              type="number"
              required
              value={x}
              onChange={(e) => setx(e.target.value)}
            />

            <label>Y-coordinates</label>
            <input
              type="number"
              required
              value={y}
              onChange={(e) => sety(e.target.value)}
            />
            <button>Create</button>
          </form>
        </div>
      </Modal>
      {/*deletecoordparent={deletecoordparent}*/}
      <div className="full-coords">
        <Coordrender
          coords={coords}
          id={id}
          deletecoordparent={deletecoordparent}
          editcoordparent={editcoordparent}
        />
      </div>
      <div className="coord-button-center">
        <div
          className="coord-button-wrapper"
          onClick={(e) => {
            setModalIsOpen(true);
          }}
        >
          <div className="coord-add-button">Add New Coordinates</div>
        </div>
      </div>
    </div>
  );
}
