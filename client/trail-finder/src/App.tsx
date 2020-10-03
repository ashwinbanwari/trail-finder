import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home/Home";
import {Navbar, Nav, NavDropdown,Container} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
function App() {
    return <>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Trail Finder</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Container style={{"padding": "1em"}}>
            < Router >
                <Switch>

                    <Route path="/" exact>
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </Container>
    </>;
}

export default App;
