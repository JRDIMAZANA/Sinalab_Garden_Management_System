import * as cashierServices from "../services/cashierServices.js";

export const fetchAllMenu = async (req, res) => {
  try {
    const menu = await cashierServices.fetchAllMenu();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menu",
      error: error.message,
    });
  }
};
