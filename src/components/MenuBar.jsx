import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import firebase from "../config/firebase";
import Logout from "./Logout";

const MenuWrapper = styled.div`
  position: fixed;
  width: 300px;
  margin-top: -10px;
  height: 100%;
  background-color: ${({ theme }) => theme.background.sub};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.text.main};

    div {
      padding: 5% 15%;
    }

    .name {
      margin: 15%;
      font-weight: bold;
    }
    .menu {
      line-height: 3rem;
      cursor: pointer;
    }

    .menu.clicked {
      background-color: ${({ theme }) => theme.background.main};
    }
`;

function MenuBar() {
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const defaultCategories = ["condition", "activity", "meal", "sleep"];
  const { pathname } = useLocation();
  const currentCategory = pathname.split("/").pop();
  const [ clickedMenu, setClickedMenu ] = useState(currentCategory);
  const { id: userId, customCategories } = useSelector((state) => state.user);

  const customCategoryNames = user
    ? customCategories.map(({ category }) => category)
    : [];
  const categories = defaultCategories.concat(customCategoryNames, ["friend", "preference"]);
  const name = user ? user.displayName : "guest";

  const handleMenuClick = function (clickedMenu) {
    history.push(`/${userId}/${clickedMenu}`);
    setClickedMenu(clickedMenu);
  };

  const categoryButtons = categories.map((category) => (
    <div
      className={category === clickedMenu ? "menu clicked" : "menu"}
      key={category}
      onClick={handleMenuClick.bind(null, category)}
    >
      {category}
    </div>
  ));

  const handleLogout = function () {
    history.push("/login");
  };

  return (
    <MenuWrapper>
      <p className="name">{name}</p>
      {categoryButtons}
      <Logout onLogout={handleLogout} />
    </MenuWrapper>
  );
}

export default MenuBar;