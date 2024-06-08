import { Container, CardFooter as FooterBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  
};

export function Footer() {
  return (
    <FooterBS className="bg-dark text-white text-center" style={footerStyle}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <NavLink to="/about" className="text-white text-decoration-none">
              About
            </NavLink>
          </div>
          <div>
            <span>© 2021 Dreamhack</span>
          </div>
          <div>
            <NavLink to="/store" className="text-white text-decoration-none">
              Store
            </NavLink>
          </div>
        </div>
      </Container>
    </FooterBS>
  );
}