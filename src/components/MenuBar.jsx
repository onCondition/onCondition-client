import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import firebase from "../config/firebase";
import Logout from "./Logout";

const MenuWrapper = styled.div`
  position: fixed;
  z-index: 1;
  width: 300px;
  margin-top: -60px;
  height: calc(100% + 60px);
  background-color: ${({ theme }) => theme.background.sub};
  color: ${({ theme }) => theme.text.main};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;

    .left {
      text-align: left;

      .name {
        margin: 15%;
        font-weight: bold;
      }

      .menu {
        line-height: 3rem;
        padding: 5% 15%;
        cursor: pointer;
      }

      .menu.clicked {
        background-color: ${({ theme }) => theme.background.main};
      }

      .button-wrapper {
        padding-left: 13%;
      }
    }

    .top {
      display: none;
      position: fixed;
      top: 0;
    }

    @media screen and (max-width: 1080px) {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      height: 40px;
      margin-top: -70px;

      .left {
        display: none;
      }

      .top {
        display: block;
        margin-right: 3%;
      }
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
      <div className="left">
        <p className="name">{name}</p>
        {categoryButtons}
        <Logout onLogout={handleLogout} />
      </div>
      <div className="top">
        <button>메뉴</button>
      </div>
    </MenuWrapper>
  );
}

export default MenuBar;
