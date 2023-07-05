import React, { useState, useEffect, useRef } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";
import { FormatdateOnly } from "../../common/Formatdate";
const Printbill = () => {
  const [sales, setSales] = useState("");
  const [company, setCompany] = useState({
    name: "",
    address: "",
    companyId: "",
  });
  const componentRef = useRef();
  const params = useParams();

  //get sale
  const getSale = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/sales/single-sale/${params.id}`
      );
      if (data?.success) {
        setSales(data?.sale);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompany();
    getSale();
  }, []);
  return (
    <Layout>
      <div>
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-primary">Print Bill</button>
          )}
          content={() => componentRef.current}
        />
        <div
          ref={componentRef}
          style={{
            fontSize: "14px",
            margin: "10px",
            fontWeight: "700",
            fontFamily: "kanit, sans-serif",
          }}
        >
          <Table>
            <tbody>
              <tr>
                <td colSpan={2} style={{padding:"0px"}}>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "0px",
                    }}
                  >
                    <img
                      alt=""
                      src={`${process.env.REACT_APP_URL}logo-sm.png`}
                      width="55"
                      height="55"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{padding:"0px"}}>
                  <div
                    style={{
                      textAlign: "center",
                      textTransform: "uppercase",
                      fontSize: "18px",
                      padding: "0px",
                      fontWeight: "800",
                    }}
                  >
                    {company.name}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{padding:"0px"}}>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "0px",
                    }}
                  >
                    {company.address}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <hr style={{ margin: "5px 0px", padding: "0px" }} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div
                    style={{
                      padding: "0px",
                    }}
                  >
                    Name: <span>{sales.name}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div
                    style={{
                      padding: "0px",
                    }}
                  >
                    Address: <span>{sales.address}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div
                    style={{
                      padding: "0px",
                    }}
                  >
                    Mobile: <span>{sales.mobile}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>
                  <div
                    style={{
                      padding: "0px",
                    }}
                  >
                    Date: {FormatdateOnly(new Date(sales.createdAt))}
                  </div>
                </td>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <div
                    style={{
                      padding: "0px",
                    }}
                  >
                    Bill No: - #DF{sales.sale_id}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <hr style={{ margin: "5px 0px", padding: "0px" }} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Table>
                    <tbody>
                      <tr>
                        <th
                          style={{
                            border: "0",
                            padding: "0.5rem 0.5rem 0.5rem 0px",
                            width: "40%",
                            fontWeight: 800,
                            verticalAlign: "middle",
                          }}
                        >
                          Item
                        </th>
                        <th
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem",
                            width: "20%",
                            fontWeight: 800,
                            verticalAlign: "middle",
                          }}
                        >
                          Qty
                        </th>
                        <th
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem",
                            width: "20%",
                            fontWeight: 800,
                            verticalAlign: "middle",
                          }}
                        >
                          Price
                        </th>
                        <th
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem 0px 0.5rem 0.5rem",
                            width: "20%",
                            fontWeight: 800,
                            verticalAlign: "middle",
                          }}
                        >
                          Sub
                          <br />
                          Total
                        </th>
                      </tr>
                      {sales.items?.map((c) => (
                        <tr key={c._id}>
                          <td
                            style={{
                              border: "0",
                              padding: "0.5rem 0.5rem 0.5rem 0px",
                              width: "40%",
                              verticalAlign: "middle",
                            }}
                          >
                            {c.name}
                          </td>
                          <td
                            style={{
                              border: "0",
                              textAlign: "right",
                              padding: "0.5rem",
                              width: "20%",
                              verticalAlign: "middle",
                            }}
                          >
                            {c.quantity}
                          </td>
                          <td
                            style={{
                              border: "0",
                              textAlign: "right",
                              padding: "0.5rem",
                              width: "20%",
                              verticalAlign: "middle",
                            }}
                          >
                            {c.price}
                          </td>
                          <td
                            style={{
                              border: "0",
                              textAlign: "right",
                              padding: "0.5rem 0px 0.5rem 0.5rem",
                              width: "20%",
                              verticalAlign: "middle",
                            }}
                          >
                            {c.quantity * c.price}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ border: "0px solid #fff" }}>
                        <td colSpan={4} style={{ padding: "0px" }}>
                          <hr style={{ margin: "5px 0px", padding: "0px" }} />
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem 0px",
                          }}
                        >
                          <div
                            style={{
                              padding: "0px",
                              border: "0px",
                              textAlign: "right",
                            }}
                          >
                            Total
                          </div>
                        </td>
                        <td
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem 0px",
                          }}
                        >
                          <div
                            style={{
                              padding: "0px",
                              border: "0px",
                              textAlign: "right",
                            }}
                          >
                            {sales.total}
                          </div>
                        </td>
                      </tr>
                      <tr style={{ border: "0px solid #fff" }}>
                        <td colSpan={4} style={{ padding: "0px" }}>
                          <hr style={{ margin: "5px 0px", padding: "0px" }} />
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem 0px",
                          }}
                        >
                          <div
                            style={{
                              padding: "0px",
                              border: "0px",
                              textAlign: "right",
                            }}
                          >
                            Discount
                          </div>
                        </td>
                        <td
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem 0px",
                          }}
                        >
                          <div
                            style={{
                              padding: "0px",
                              border: "0px",
                              textAlign: "right",
                            }}
                          >
                            {sales.discount}
                          </div>
                        </td>
                      </tr>
                      <tr style={{ border: "0px solid #fff" }}>
                        <td colSpan={4} style={{ padding: "0px" }}>
                          <hr style={{ margin: "5px 0px", padding: "0px" }} />
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem 0px",
                          }}
                        >
                          <div
                            style={{
                              padding: "0px",
                              border: "0px",
                              textAlign: "right",
                            }}
                          >
                            Net Price
                          </div>
                        </td>
                        <td
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem 0px",
                          }}
                        >
                          <div
                            style={{
                              padding: "0px",
                              border: "0px",
                              textAlign: "right",
                            }}
                          >
                            {sales.netPrice}
                          </div>
                        </td>
                      </tr>
                      <tr style={{ border: "0px solid #fff" }}>
                        <td colSpan={4} style={{ padding: "0px" }}>
                          <hr style={{ margin: "5px 0px", padding: "0px" }} />
                        </td>
                      </tr>
                      <tr style={{ border: "0px solid #fff" }}>
                        <td colSpan={4} style={{ textAlign: "center" }}>
                          <div
                            style={{
                              padding: "0px",
                              border: "0px",
                            }}
                          >
                            Thank you for ordering!
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Printbill;
