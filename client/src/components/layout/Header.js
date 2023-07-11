import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contextapi/AdminContext";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBCollapse,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";
const Header = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/admin/login");
    }, 2000);
  };
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light" className="nav-class">
        <MDBContainer fluid>
          <NavLink to="/admin/sales" className="header-logo">
            <span>Desi</span> Flavours
          </NavLink>
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 ul-header-design">
              <MDBNavbarItem>
                <NavLink to="/admin/sales" className="nav-link">
                  Sales
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Masters
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                  <NavLink
                      to="/admin/masters/category"
                      className="dropdown-item"
                    >
                      Category Master
                    </NavLink>
                    <NavLink
                      to="/admin/masters/subcategory"
                      className="dropdown-item"
                    >
                      Sub Category Master
                    </NavLink>
                    <NavLink
                      to="/admin/masters/items"
                      className="dropdown-item"
                    >
                      Item Master
                    </NavLink>
                    <NavLink
                      to="/admin/masters/company"
                      className="dropdown-item"
                    >
                      Company Master
                    </NavLink>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <MDBDropdown>
              <MDBDropdownToggle className="custom-account-name">
                {auth?.user?.name}
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <NavLink to="/admin/masters/items" className="dropdown-item">
                  My Profile
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="dropdown-item"
                >
                  Logout
                </button>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
