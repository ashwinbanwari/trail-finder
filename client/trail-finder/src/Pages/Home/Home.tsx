import React from "react";
import {InputGroup, Form, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function Home() {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log(form);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="searchLocation" >
                    <InputGroup>
                        <InputGroup.Prepend>
                            <Button type="submit"> <FontAwesomeIcon icon={faSearch}/> </Button>
                        </InputGroup.Prepend>
                        <Form.Control size="lg" type="text" />

                    </InputGroup>
                </Form.Group>

            </Form>
        </>
    );
}

export default Home;
