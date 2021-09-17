import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import firebase from "../config/firebase";
import Logout from "./Logout";
import Button from "./Button";

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

    .button-wrapper {
      padding-left: 13%;
    }

    .top {
      display: none;
      position: fixed;
      top: 0;
    }

    .hidden-menu {
      margin-top: 40px;
      width: 200px;
      text-align: left;
    }

    .name {
        margin: 15%;
        font-weight: bold;
      }

    .menu {
      padding: 5% 15%;
      background-color: ${({ theme }) => theme.background.sub};
      line-height: 3rem;
      text-align: left;
      cursor: pointer;
    }

    .menu.clicked {
      background-color: ${({ theme }) => theme.background.main};
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

        button {
          width: 50px;
          height: 30px;
          margin: 0;
        }
      }
    }
`;

function MenuBar() {
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const defaultCategories = ["condition", "activity", "meal", "sleep"];
  const { pathname } = useLocation();
  const currentCategory = pathname.split("/").pop();
  const [clickedCategory, setClickedCategory] = useState(currentCategory);
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const { id: userId, customCategories } = useSelector((state) => state.user);

  const customCategoryNames = user
    ? customCategories.map(({ category }) => category)
    : [];
  const categories = defaultCategories.concat(customCategoryNames, ["friend", "preference"]);
  const name = user ? user.displayName : "guest";

  const handleMenuClick = function (clickedCategory) {
    history.push(`/${userId}/${clickedCategory}`);
    setClickedCategory(clickedCategory);
  };

  const handleShowMenuButton = function () {
    setIsShowingMenu(!isShowingMenu);
  };

  const categoryButtons = categories.map((category) => (
    <div
      className={category === clickedCategory ? "menu clicked" : "menu"}
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
        <Button
          text="메뉴"
          onClick={handleShowMenuButton}
        />
      </div>
      {isShowingMenu && <div className="hidden-menu">
        {categoryButtons}
      </div>}
    </MenuWrapper>
  );
}

export default MenuBar;
