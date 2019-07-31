import React from "react";
import { Modal, Button } from "react-bootstrap";

// let the player decide if they want to continue or quit
class QuitOrContinueDialog extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} aria-labelledby="winOrLossLabel" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="winOrLossLabel">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onQuit}>Quit</Button>
                    <Button onClick={this.props.onContinue}>Continue</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default QuitOrContinueDialog;
