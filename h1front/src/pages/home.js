import React from "react";
import { Layout, Row, Col, Progress, Typography } from "antd";
import Todo from "../pages/todo";

const { Text } = Typography;

const Home = ({
  taskArray,
  taskDoneHandler,
  deleteTaskHandler,
  taskEditHandler,
}) => {
  const done = taskArray.filter((task) => task.done).length;
  const total = taskArray.length;

  return (
    <Layout style={{ backgroundColor: "transparent" }}>
      <Row
        gutter={24}
        justify="center"
        align="middle"
        style={{ margin: "20px" }}
      >
        <Progress
          style={{ margin: "5px" }}
          type="circle"
          percent={Math.round((done * 100) / total)}
        />
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <Text strong style={{ color: "#1890ff" }}>
            ToDo
          </Text>

          <Todo
            taskEditHandler={taskEditHandler}
            taskDoneHandler={taskDoneHandler}
            deleteTaskHandler={deleteTaskHandler}
            taskArray={taskArray.filter((task) => !task.done)}
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <Text strong style={{ color: "#1890ff" }}>
            Done
          </Text>
          <Todo
            taskEditHandler={taskEditHandler}
            deleteTaskHandler={deleteTaskHandler}
            taskArray={taskArray.filter((task) => task.done)}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
