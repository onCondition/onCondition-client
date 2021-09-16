import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CustomAlbum from "./CustomAlbum";
import CustomGrid from "./CustomGrid";
import { setError } from "../features/errorSlice";
import STATUS_CODES from "../constants/statusCodes";
import { ERROR } from "../constants/messages";

function CustomCategory() {
  const { customCategories } = useSelector((state) => state.user);
  const { category: categoryName } = useParams();

  const categoryInfo = customCategories
    .find(({ category }) => category === categoryName);

  if (!categoryInfo) {
    const statusCode = STATUS_CODES.NOT_FOUND;
    const message = ERROR.NOT_FOUND;

    setError({ statusCode, message });
  }

  const { categoryType } = categoryInfo;
  const customPage = categoryType === "grid" ? <CustomGrid /> : <CustomAlbum />;

  return customPage;
}

export default CustomCategory;