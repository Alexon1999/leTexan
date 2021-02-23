import { Modal, Button } from "react-bootstrap";

const ModalBootsrap = ({ children, show, handleClose, title, img }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <h2>{title}</h2>
              <img
                src={img}
                alt=''
                style={{ maxWidth: "80%", objectFit: "contain" }}
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default ModalBootsrap;
