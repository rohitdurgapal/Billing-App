import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Formatdate from "../../common/Formatdate";
import Itemform from "../items/Itemform";
const Items = () => {
  const [items, setItems] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [itemId, setItemId] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [flag, setFlag] = useState(false);
  var count = 0;
  //handle Form
  const handleSubmit = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/items/create-item`,
        {
          code,
          name,
          price,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setCode("");
        setName("");
        setPrice("");
        setItemId("");
        getAllItem();
        setFlag(false);
      } else {
        toast.error(data.message);
        setFlag(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setFlag(false);
    }
  };

  //get all item
  const getAllItem = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/items/get-item`
      );
      if (data?.success) {
        setItems(data?.item);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting items");
    }
  };

  useEffect(() => {
    getAllItem();
  }, []);

  //get single item
  const getSingleItem = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/items/single-item/${id}`
      );
      if (data.success) {
        setCode(data.item.code);
        setName(data.item.name);
        setPrice(data.item.price);
        setItemId(data.item._id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //update item
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND}api/v1/items/update-item/${itemId}`,
        { code, name, price }
      );
      if (data.success) {
        toast.success(`${name} is updated`);
        setCode("");
        setName("");
        setPrice("");
        setItemId("");
        getAllItem();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deletePopUp = (id) => {
    const result = toast.custom(
      <div className="toast-delete">
        Are you sure you want to delete this item?{"  "}
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
            toast.error("Item is not deleted.");
          }}
        >
          No
        </Button>
      </div>
    );
  };
  //delete item
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND}api/v1/items/delete-item/${id}`
      );
      if (data.success) {
        toast.success(`Item is deleted`);
        setConfirm();
        getAllItem();
      }
      if (confirm && confirm === false) {
        setConfirm();
        toast.error(`Item is not deleted`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Item Master"}>
      <Itemform
        handleAction={itemId === "" ? handleSubmit : handleUpdate}
        code={code}
        setCode={setCode}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        itemId={itemId}
        flag={flag}
      />
      <div className="item-listing">
        <h3 className="mt-3">Item Listing</h3>
        <Table striped className="table-design">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "20%" }}>Item Name</th>
              <th>Item Code</th>
              <th>Item Price</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th style={{ width: "15%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((c) => (
              <tr key={c._id}>
                <td style={{ width: "5%" }}>{++count}</td>
                <td style={{ width: "20%" }}>{c.name}</td>
                <td>{c.code}</td>
                <td>{c.price}</td>
                <td>{Formatdate(new Date(c.createdAt))}</td>
                <td>{Formatdate(new Date(c.updatedAt))}</td>
                <td style={{ width: "15%" }}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-1 mb-1"
                    type="button"
                    onClick={() => getSingleItem(c._id)}
                  >
                    Edit
                  </Button>
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
      </div>
    </Layout>
  );
};

export default Items;
