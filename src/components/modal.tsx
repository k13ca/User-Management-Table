import { FC } from "react";
import { Props } from "../models/props.model";
const Modal: FC<Props.Modal> = ({ handleUserDelete, setModalAlert }) => {
  return (
    <div className="modal">
      <h2>Are You sure?</h2>
      <div>
        <button
          className="option-button-selected"
          onClick={handleUserDelete}
          style={{ marginRight: "10px" }}
        >
          Yes
        </button>
        <button
          className="option-button"
          onClick={() => setModalAlert(false)}
          style={{ marginLeft: "10px" }}
        >
          No
        </button>
      </div>
    </div>
  );
};
export default Modal;
