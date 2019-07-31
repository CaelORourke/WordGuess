import React from "react";
import { Modal, Button } from "react-bootstrap";

// let the player know the game is over
class GameOverDialog extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} aria-labelledby="gameOverLabel" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="gameOverLabel">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Ok</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default GameOverDialog;
