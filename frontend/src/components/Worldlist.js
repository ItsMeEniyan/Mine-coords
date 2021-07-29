import React, { useEffect, useState } from "react";
import axios from "axios";
import Worldrender from "./Worldrender";

import "./Worldlist.css";
import "./modal.css";
import Modal from "react-modal";

export default function Worldlist() {
  const url = `${process.env.REACT_APP_SERVER_URL}/world`;

  const [worlds, getworlds] = useState("");
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [worldname, setworldname] = useState("");

  const deleteworldparent = (thatid) => {
    /*{const thatworldindex = worlds.findIndex((x)=>{
        return x._id===thatid;
      });}*/
    //const w=worlds;
    //const a = w.splice(thatworldindex,1);
    //getworlds(a)
    const copyworld = Object.assign([], worlds);
    const thatworldindex = copyworld.findIndex((x) => {
      return x._id === thatid;
    });
    console.log(thatworldindex);
    copyworld.splice(thatworldindex, 1);
    getworlds(copyworld);
  };

  const editworldparent = (thatid, newworldname) => {
    /*{const thatworldindex = worlds.findIndex((x)=>{
        return x._id===thatid;
      });}*/
    //const w=worlds;
    //const a = w.splice(thatworldindex,1);
    //getworlds(a)
    const copyworld = Object.assign([], worlds);
    const thatworldindex = copyworld.findIndex((x) => {
      return x._id === thatid;
    });
    console.log(thatworldindex);
    copyworld[thatworldindex].worldname = newworldname;
    getworlds(copyworld);
  };

  const handlesubmit = (e) => {
    axios
      .post(
        `${url}`,
        { worldname: worldname },
        {
          headers: {
            Authorization: `bearer ${jwtTok}`,
          },
        }
      )
      .then((response) => {
        const newworld = { worldname: worldname, _id: response.data };

        const copyworld = Object.assign([], worlds);
        copyworld.push(newworld);
        getworlds(copyworld);
        console.log(response.data);
      });
    setModalIsOpen(false);
    e.preventDefault();
    setworldname("");

    //axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
  };

  useEffect(() => {
    getallworlds();
  }, []);

  const jwtTok = localStorage.getItem("jwtTok");

  const getallworlds = () => {
    axios
      .get(`${url}/name`, {
        headers: {
          Authorization: `bearer ${jwtTok}`,
        },
      })
      .then((response) => {
        const allworlds = response.data;

        getworlds(allworlds);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  // const {jwtTok}  = useParams();
  // localStorage.setItem("jwtTok", jwtTok);

  return (
    <div>
      <div className="worlds">
        <Worldrender
          worlds={worlds}
          deleteworldparent={deleteworldparent}
          editworldparent={editworldparent}
        />
      </div>
      <div className="button-center">
        <div
          className="button-wrapper"
          onClick={(e) => {
            setModalIsOpen(true);
          }}
        >
          <div className="add-button">Add New World</div>
        </div>
      </div>
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
          <form onSubmit={handlesubmit}>
            <label>Enter the world’s name</label>
            <input
              type="text"
              maxLength="32"
              required
              value={worldname}
              onChange={(e) => setworldname(e.target.value)}
            />
            <button>Create</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
