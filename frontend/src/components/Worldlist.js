import React, { useEffect, useState } from "react";
import axios from "axios";
import Worldrender from "./Worldrender";
import Modal from "react-modal";

export default function Worldlist() {
  const url = "http://localhost:9000/world";

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
    const copyworld = Object.assign([],worlds)
    const thatworldindex = copyworld.findIndex((x)=>{
      return x._id===thatid;
    });
    console.log(thatworldindex)
    copyworld.splice(thatworldindex,1);
    getworlds(copyworld)

  };

  const handlesubmit = () => {
    axios.post(`${url}`, { worldname: worldname });
    //axios.patch(`${url}/editworld`, { data: { worldid: _id ,worldname: changename} });
  };

  useEffect(() => {
    getallworlds();
  }, []);

  const getallworlds = () => {
    axios
      .get(`${url}/name`)
      .then((response) => {
        const allworlds = response.data;
        getworlds(allworlds);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Add New World</button>
      <Modal isOpen={ModalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handlesubmit}>
          <label>World Name:</label>
          <input
            type="text"
            required
            value={worldname}
            onChange={(e) => setworldname(e.target.value)}
          />
          <button>Add new World Name</button>
        </form>
      </Modal>
      <Worldrender worlds={worlds} deleteworldparent={deleteworldparent} />
    </div>
  );
}
