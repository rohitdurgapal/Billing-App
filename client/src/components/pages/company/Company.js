import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
const Company = () => {
  const [company, setCompany] = useState({
    name: "",
    address: "",
    companyId: "",
  });

  // get data on update
  const getCompany = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/company/get-company`
      );
      if (data?.success) {
        if (data.company.length > 0) {
          setCompany({
            name: data.company[0].name,
            address: data.company[0].address,
            companyId: data.company[0]._id,
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getCompany();
  }, []);

  const handleAction = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/company/create-update-company`,
        {
          name: company.name,
          address: company.address,
          companyId: company.companyId,
        }
      );
      if (data?.success) {
        toast.success(`${data.company[0].name} is saved`);
        setCompany({
          name: data.company[0].name,
          address: data.company[0].address,
          companyId: data.company[0]._id,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={"Company Master"}>
      <h3>Company Listing</h3>
      <Form onSubmit={handleAction}>
        <Row>
          <Col xs={2}>
            <Form.Control
              type="text"
              placeholder="Company Name"
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
            />
          </Col>
          <Col xs={9}>
            <Form.Control
              type="text"
              placeholder="Company Address"
              value={company.address}
              onChange={(e) =>
                setCompany({ ...company, address: e.target.value })
              }
            />
          </Col>
          <Col xs={1}>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default Company;
