import * as cashierModel from "../models/cashierModel.js";

export const fetchAllMenu = async () => {
  const menuItems = await cashierModel.cashierMenu();
  return menuItems;
};
