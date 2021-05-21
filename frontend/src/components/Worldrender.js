import React, { useState } from "react";
import Modal from "react-modal";
import "./Worldrender.css";

import "./modal.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Worldrender(props) {
  //console.log(props.worlds)

  let history = useHistory();

  const [ModalIsOpen, setModalIsOpen] = useState(false);

  const [changename, setchangename] = useState("");
  const [currentworldid, setcurrentworldid] = useState("");

  const url = "http://localhost:9000/world";

  const deleteWorld = (_id, e) => {
    axios.delete(`${url}/deleteworld`, { data: { worldid: _id } });
    props.deleteworldparent(_id);
  };
  /*{const editWorld = (_id,e) => {
         axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
        }}*/
  const handlesubmit = (e) => {
    axios.patch(`${url}/editworld`, {
      worldid: currentworldid,
      worldname: changename,
    });
    console.log(currentworldid);
    props.editworldparent(currentworldid, changename);
    setModalIsOpen(false);
    e.preventDefault();
    setchangename("");
    //axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
  };

  const displayworlds = (props) => {
    const worlds = props.worlds;
    //const {deleteworldparent} = props;
    console.log("hai");

    if (worlds.length > 0) {
      return (
        <>
          {worlds.map((world, index) => {
            console.log.apply(world);
            return (
              <div
                className="world"
                key={world._id}
                onClick={() => history.push(`/coords/${world._id}`)}
              >
                <div id="world_container">
                  <h3 className="world_name">{world.worldname}</h3>
                  <div className="button-set">
                    <div
                      className="edit-button"
                      onClick={(e) => {
                        setModalIsOpen(true);
                        e.stopPropagation();
                        e.preventDefault();
                        setcurrentworldid(world._id);
                      }}
                    >
                      <div>Edit</div>
                    </div>
                    <div
                      className="delete-button"
                      onClick={(e) => {
                        deleteWorld(world._id, e);
                        e.stopPropagation();
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
          <Modal
          className="world-modal"
            isOpen={ModalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
          <div className="modal-padding">
            <form onSubmit={(e) => handlesubmit(e)}>
              <label>Enter the new name</label>
              <input
                type="text"
                maxLength="32"
                required
                value={changename}
                onChange={(e) => setchangename(e.target.value)}
              />
              <button>Change name</button>
            </form>
            </div>
          </Modal>
        </>
      );
    } else {
      return <h3>World is not created yet</h3>;
    }
  };

  return <div>{displayworlds(props)}</div>;
}
