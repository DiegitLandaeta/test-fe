import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, NavLink } from "react-router-dom";
import { Layout, Spin, Result, Button, Tooltip, Row, Typography } from "antd";
import { PlusCircleOutlined, CarryOutOutlined } from "@ant-design/icons";

import Home from "../pages/home";
import Menu from "./menu/menu";
import Todo from "../pages/todo";
import Form from "../components/Form/Form";
import "./navigation.css";

import axios from "axios";

const { Header, Footer } = Layout;
const { Text } = Typography;

const Navigation = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/v1/demo/tasks")
      .then((response) => {
        setTaskArray(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", height: "100vh" }}>
        <Spin style={{ position: "absolute", top: "50%" }} size="large" />
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ textAlign: "center", height: "100vh" }}>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      </div>
    );
  }

  const addorUpdateTaskHandler = (newTask) => {
    const task = {
      title: newTask.Title,
      description: newTask.Description,
      date: newTask.Date.format("DD/MM/YYYY"),
      done: newTask.Completed,
    };
    let newTaskArray = [];
    if (taskToEdit) {
      task.id = taskToEdit.id;
      newTaskArray = taskArray.map((taskObj) => {
        if (task.id === taskObj.id) return { ...task };
        return taskObj;
      });
    } else {
      task.id = Math.max(...taskArray.map((task) => task.id)) + 1; // Al no tener bbdd, se asiga un id para indentificar al editar o eliminar.
      newTaskArray = taskArray.concat(task);
    }

    setTaskArray(newTaskArray);
    setShowModal(false);
    setTaskToEdit(null);
  };

  const taskDoneHandler = (id) => {
    const newTaskArray = taskArray.map((task) => {
      if (id === task.id) return { ...task, done: !task.done };
      return task;
    });
    setTaskArray(newTaskArray);
  };

  const deleteTaskHandler = (id) => {
    const newTaskArray = [];
    taskArray.forEach((task) => {
      if (id !== task.id) newTaskArray.push({ ...task });
    });
    setTaskArray(newTaskArray);
  };

  const taskEditHandler = (id) => {
    const task = taskArray.find((task) => task.id === id);
    setTaskToEdit({ ...task });
  };

  const showAddTaskModal = () => {
    setShowModal(true);
  };
  const hideAddTaskModal = () => {
    setShowModal(false);
    setTaskToEdit(null);
  };
  const routesApp = (
    <Switch>
      <Route
        path="/todo"
        render={() => (
          <Todo
            taskDoneHandler={(ev) => taskDoneHandler(ev)}
            taskEditHandler={(id) => taskEditHandler(id)}
            deleteTaskHandler={(ev) => deleteTaskHandler(ev)}
            taskArray={taskArray.filter((task) => !task.done)}
          />
        )}
      />
      <Route
        path="/done"
        render={(props) => (
          <Todo
            deleteTaskHandler={(ev) => deleteTaskHandler(ev)}
            taskEditHandler={(id) => taskEditHandler(id)}
            taskArray={taskArray.filter((task) => task.done)}
          />
        )}
      />
      <Route
        path="/"
        render={(props) => (
          <Home
            taskDoneHandler={(ev) => taskDoneHandler(ev)}
            deleteTaskHandler={(ev) => deleteTaskHandler(ev)}
            taskEditHandler={(id) => taskEditHandler(id)}
            taskArray={taskArray}
          />
        )}
      />
    </Switch>
  );

  const content = (
    <div className="app-wrapper">
      <Header className="header" style={{ background: "#fff", height: "100%" }}>
        <Row justify="center" align="middle" style={{ color: "#1890ff" }}>
          <NavLink to="/">
            <CarryOutOutlined style={{ marginRight: "5px" }} />
            <Text strong style={{ color: "#1890ff" }}>
              ToDO
            </Text>
          </NavLink>
        </Row>
      </Header>

      <Form
        key={taskToEdit}
        visible={showModal || taskToEdit}
        onCreate={addorUpdateTaskHandler}
        onCancel={hideAddTaskModal}
        width={800}
        taskToEdit={taskToEdit}
      />
      <Menu className="tasks-menu" selectedMenuItem={location.pathname} />
      <div className="tasks">{routesApp}</div>
      <div className="buttonGrd">
        <Tooltip title="Add task" placement="left">
          <Button
            style={{
              margin: "10px",
            }}
            onClick={showAddTaskModal}
            type="primary"
            shape="circle"
            icon={<PlusCircleOutlined />}
            size="large"
          />
        </Tooltip>
      </div>
      <Footer
        className="footer"
        style={{
          textAlign: "center",
          backgroundColor: "white",
          color: "black",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text strong style={{ margin: 0, color: "#1890ff" }}>
          Hipoteca Primero © 2018-2021
        </Text>
      </Footer>
    </div>
  );

  return content;
};

export default Navigation;
