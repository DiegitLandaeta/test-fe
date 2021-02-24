import React from "react";
import { Layout, Row, Col } from "antd";
import TaskList from "../components/taskList/taskList";

const { Content } = Layout;
const Todo = ({
  taskArray,
  taskDoneHandler,
  deleteTaskHandler,
  taskEditHandler,
}) => {
  return (
    <Layout>
      <Content>
        <Row gutter={16}>
          <Col span={24}>
            <TaskList
              taskEditHandler={taskEditHandler}
              taskDoneHandler={taskDoneHandler}
              deleteTaskHandler={deleteTaskHandler}
              taskArray={taskArray}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default Todo;
