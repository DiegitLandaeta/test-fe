import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

import {
  FileDoneOutlined,
  FileTextOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import "../navigation.css";

export default class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const menuConstants = [
      { key: 1, icon: ScheduleOutlined, text: "Dashboard", url: "/" },
      { key: 2, icon: FileTextOutlined, text: "To-do", url: "/todo" },
      { key: 3, icon: FileDoneOutlined, text: "Done", url: "/done" },
    ];

    let menuKey = menuConstants.find(
      (item) => item.url === this.props.selectedMenuItem
    );
    if (!menuKey) {
      menuKey = 1;
    } else {
      menuKey = menuKey.key;
    }
    return (
      <div>
        <Menu
          className="menuScreenWhole"
          defaultSelectedKeys={[`${menuKey}`]}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
          {menuConstants.map((menuItem) => {
            return (
              <Menu.Item key={menuItem.key} icon={<menuItem.icon />}>
                <NavLink to={menuItem.url}>{menuItem.text}</NavLink>
              </Menu.Item>
            );
          })}
        </Menu>
        <Menu
          className="menuMobile"
          defaultSelectedKeys={[`${menuKey}`]}
          mode="vertical"
          theme="light"
          inlineCollapsed={!this.state.collapsed}
        >
          {menuConstants.map((menuItem) => {
            return (
              <Menu.Item key={menuItem.key} icon={<menuItem.icon />}>
                <NavLink to={menuItem.url}>{menuItem.text}</NavLink>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );
  }
}
