import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function UtilModal({message, show, compScore, playerScore, handleClose}) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <p>Bangladesh Score: {playerScore}</p>
            <p>India (Computer) Score: {compScore}</p>
            <br />
            <h4>{message}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default UtilModal