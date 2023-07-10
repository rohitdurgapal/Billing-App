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
        <h3>Sales</h3>
        <Link to="/admin/sales/add" className="btn custom-btn">
          Add
        </Link>
      </div>
      <div className="stricky-table"> <Table className="table-design table-responsive">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Sale Id</th>
            <th>Customer</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Total</th>
            <th>Discount</th>
            <th>Net Price</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((c) => (
            <tr key={c._id}>
              <td>{++count}</td>
              <td>#DF{c.sale_id}</td>
              <td>{c.name}</td>
              <td>{c.mobile}</td>
              <td>{c.address}</td>
              <td>{c.total}</td>
              <td>{c.discount}</td>
              <td>{c.netPrice}</td>
              <td>{Formatdate(new Date(c.createdAt))}</td>
              <td>{Formatdate(new Date(c.updatedAt))}</td>
              <td>
                <NavLink
                  to={`/sales/print-bill/${c._id}`}
                  className="btn custom-btn me-1 btn-sm mb-1"
                >
                  P
                </NavLink>
                <NavLink
                  to={`/sales/update/${c._id}`}
                  className="btn custom-btn me-1 btn-sm mb-1"
                >
                  E
                </NavLink>
                <Button
                  className="btn custom-btn me-1 btn-sm mb-1"
                  onClick={() => deletePopUp(c._id)}
                >
                  D
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table></div>
    </Layout>
  );
};

export default Sales;
