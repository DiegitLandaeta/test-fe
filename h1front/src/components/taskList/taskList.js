import React from "react";
import { Collapse, Popconfirm, Tooltip } from "antd";
import {
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

export default class TaskList extends React.Component {
  render() {
    return (
      <Collapse expandIconPosition="right">
        {this.props.taskArray.map((task, i) => {
          return (
            <Panel
              header={task.title}
              key={task.id}
              id={task.id}
              extra={
                <Tooltip title="Edit task" placement="left">
                  <EditOutlined
                    onClick={(event) => {
                      this.props.taskEditHandler(task.id);
                      event.stopPropagation();
                    }}
                  />
                </Tooltip>
              }
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {task.description && <p>{task.description}</p>}
                <div style={{ textAlign: "right" }}>{task.date}</div>
              </div>
              <div
                style={{
                  width: "60px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  margin: "0 auto",
                  marginRight: 0,
                }}
              >
                <Popconfirm
                  title="Are you sure to delete this task?"
                  placement="right"
                  onConfirm={() => this.props.deleteTaskHandler(task.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="Delete task" placement="left">
                    <CloseCircleOutlined
                      style={{ fontSize: "24px", color: "red" }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    />
                  </Tooltip>
                </Popconfirm>
                {!task.done && (
                  <Tooltip title="Done" placement="left">
                    <CheckCircleOutlined
                      style={{ fontSize: "24px", color: "green" }}
                      onClick={(event) => {
                        this.props.taskDoneHandler(task.id);
                        event.stopPropagation();
                      }}
                    />
                  </Tooltip>
                )}
              </div>
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}
