import saleModel from "../models/saleModel.js";

// create sale
export const createSaleController = async (req, res) => {
  try {
    const { name, mobile, address, items, total, discount, netPrice } =
      req.body;
    if (!mobile) {
      return res.status(401).send({ message: "Mobile is required" });
    }
    if (!address) {
      return res.status(401).send({ message: "Address is required" });
    }
    let count = await saleModel.find().count();
    count = count + 1;
    const sale = await new saleModel({
      sale_id: count,
      name,
      mobile,
      address,
      items,
      total,
      discount,
      netPrice,
    }).save();
    res.status(201).send({
      success: true,
      message: "New Sale Created",
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Sale",
    });
  }
};

// get all sale
export const saleControlller = async (req, res) => {
  try {
    const sale = await saleModel.find({ status: 1 }).sort({ sale_id: -1 });
    res.status(200).send({
      success: true,
      message: "All Sales List",
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all sale",
    });
  }
};

// single item
export const singleSaleController = async (req, res) => {
  try {
    const sale = await saleModel.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Get Single Sale Successfully",
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Sale",
    });
  }
};

//update sale
export const updateSaleController = async (req, res) => {
  try {
    const { name, mobile, address, items, total, discount, netPrice } =
      req.body;
    if (!mobile) {
      return res.status(401).send({ message: "Mobile is required" });
    }
    if (!address) {
      return res.status(401).send({ message: "Address is required" });
    }
    const { id } = req.params;
    const sale = await saleModel.findByIdAndUpdate(
      id,
      {
        name,
        mobile,
        address,
        items,
        total,
        discount,
        netPrice,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Sale Updated Successfully",
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Sale",
    });
  }
};

//delete sale
export const deleteSaleController = async (req, res) => {
  try {
    const { id } = req.params;
    await saleModel.findByIdAndUpdate(
      id,
      {
        status: 0,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Sale Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting sale",
      error,
    });
  }
};
