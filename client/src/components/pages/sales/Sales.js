import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Formatdate from "../../common/Formatdate";
import Button from "react-bootstrap/Button";
const Sales = () => {
  const [sales, setSales] = useState([]);
  const [confirm, setConfirm] = useState(false);
  var count = 0;
  //get all sale
  const getAllSale = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/sales/get-sale`
      );
      if (data?.success) {
        setSales(data?.sale);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting sales");
    }
  };

  useEffect(() => {
    getAllSale();
  }, []);

  const deletePopUp = (id) => {
    const result = toast.custom(
      <div className="toast-delete">
        Are you sure you want to delete this sale?{"  "}
        <Button
          variant="primary"
          size="sm"
          className="me-1"
          type="button"
          onClick={() => {
            toast.dismiss(result);
            handleDelete(id);
          }}
        >
          Yes
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="me-1"
          type="button"
          onClick={() => {
            toast.dismiss(result);
            toast.error("Sale is not deleted.");
          }}
        >
          No
        </Button>
      </div>
    );
  };
  //delete sale
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND}api/v1/sales/delete-sale/${id}`
      );
      if (data.success) {
        toast.success(`Sale is deleted`);
        setConfirm();
        getAllSale();
      }
      if (confirm && confirm === false) {
        setConfirm();
        toast.error(`Sale is not deleted`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Sales">
      <div className="add-block">
        <h3>Sale Listing</h3>
        <Link to="/sales/add" className="btn btn-primary">
          Add
        </Link>
      </div>
      <Table striped className="table-design">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th>Sale Id</th>
            <th>Customer Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Total</th>
            <th>Discount</th>
            <th>Net Price</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th style={{ width: "15%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((c) => (
            <tr key={c._id}>
              <td style={{ width: "5%" }}>{++count}</td>
              <td>#DF{c.sale_id}</td>
              <td>{c.name}</td>
              <td>{c.mobile}</td>
              <td>{c.address}</td>
              <td>{c.total}</td>
              <td>{c.discount}</td>
              <td>{c.netPrice}</td>
              <td>{Formatdate(new Date(c.createdAt))}</td>
              <td>{Formatdate(new Date(c.updatedAt))}</td>
              <td style={{ width: "15%" }}>
                <NavLink
                  to={`/sales/print-bill/${c._id}`}
                  className="me-1 btn btn-secondary btn-sm mb-1"
                >
                  Print Bill
                </NavLink>
                <NavLink
                  to={`/sales/update/${c._id}`}
                  className="me-1 btn btn-primary btn-sm mb-1"
                >
                  Edit
                </NavLink>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-1 mb-1"
                  onClick={() => deletePopUp(c._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Sales;
