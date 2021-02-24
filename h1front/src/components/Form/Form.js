import React, { useState } from "react";
import { Form, Modal, DatePicker, Input, Checkbox } from "antd";
import moment from "moment";

const { TextArea } = Input;

const NewForm = ({ visible, onCancel, onCreate, taskToEdit }) => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(taskToEdit ? taskToEdit.done : false);

  const checkboxChangeHandler = () => {
    setChecked(!checked);
  };
  return (
    <Modal
      visible={visible}
      title="Add a task!"
      okText="Done"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            values.Completed = checked;
            onCreate(values);
            setChecked(false);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="taskForm"
        initialValues={{
          Title: taskToEdit ? taskToEdit.title : "",
          Description: taskToEdit ? taskToEdit.description : "",
          Date: moment(
            taskToEdit ? taskToEdit.date : moment().format("DD/MM/YYYY"),
            "DD/MM/YYYY"
          ),
        }}
      >
        <Form.Item
          name="Title"
          label="Title"
          rules={[{ required: true, message: "Please add a title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Description"
          rules={[{ required: true, message: "Please add a title" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="Date"
          label="Date"
          rules={[{ required: true, message: "Please register a date" }]}
        >
          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>

        <Form.Item label="Completed" valuePropName="checked" noStyle>
          Done:{" "}
          <Checkbox
            onChange={() => checkboxChangeHandler()}
            checked={checked ? true : false}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewForm;
