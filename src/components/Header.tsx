import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <header>
                <Navbar bg="primary">
                    <Container>
                        <Navbar.Brand onClick={() => navigate("/")}>Saku Shirakura</Navbar.Brand>
                        <NavDropdown title="Clocks" id={`navbar`}>
                            <NavDropdown.Item onClick={() => {
                                navigate("/clock/star_orbit/")
                            }}>星の軌道時計(適当)</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {
                                navigate("/clock/color_code/")
                            }}>色時計</NavDropdown.Item>
                        </NavDropdown>
                        <Nav onClick={() => {
                            navigate("/signup")
                        }}>Signup</Nav>
                        <Nav onClick={() => {
                            navigate("/login")
                        }}>Login</Nav>
                    </Container>
                </Navbar>
                <div className="pb-5"/>
            </header>
        </>
    );
}