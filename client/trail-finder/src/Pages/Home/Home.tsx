import React from "react";
import {InputGroup, Form, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
function Home() {
    return (
        <>
            <Form>
                <Form.Group controlId="searchLocation">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <Button> <FontAwesomeIcon icon={faSearch}/> </Button>
                        </InputGroup.Prepend>
                        <Form.Control size="lg" type="text" />

                    </InputGroup>
                </Form.Group>

            </Form>
        </>
    );
}

export default Home;
