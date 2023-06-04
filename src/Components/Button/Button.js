import "./Button.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const Button = (props) => {
  const { id, type, onSubmit, onClick, title, icon } = props;

  const getIcon = (icon) => {
    switch (icon) {
      case "faTrashCan":
        return faTrashCan;
      case "faPenToSquare":
        return faPenToSquare;
      case "faCheck":
        return faCheck;
      case "faXmark":
        return faXmark;
      default:
        return faTrashCan;
    }
  }
  return (
    <>
      <button className="btn" id={id} type={type} onSubmit={onSubmit} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={getIcon(icon)} id="ic"/>}
      {!icon && title}
    </button>
    </>
  );
};
