import companyModel from "../models/companyModel.js";

// create/update company
export const createUpdateCompanyController = async (req, res) => {
  try {
    const { companyId, name, address } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    if (!address) {
      return res.status(401).send({ message: "Address is required" });
    }
    if (companyId != "") {
      await companyModel.findByIdAndUpdate(
        companyId,
        { name, address },
        { new: true }
      );
    } else {
      await new companyModel({
        name,
        address,
      }).save();
    }
    const companyInfo = await companyModel.find();
    res.status(201).send({
      success: true,
      message: "Company Saved.",
      company: companyInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Company",
    });
  }
};

// get company
export const companyController = async (req, res) => {
  try {
    const company = await companyModel.find();
    res.status(200).send({
      success: true,
      message: "All Company List",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Company",
    });
  }
};
