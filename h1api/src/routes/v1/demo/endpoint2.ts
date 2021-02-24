import joi from "@hapi/joi";
import Api from "../../../models/Api";

export default {
  method: "POST",
  path: `/v1/demo/tasks`,
  options: {
    description: "demo endpoint 1",
    tags: ["demo"],
    notes: [],
    auth: false,
  },
  handler: async (request, h) => {
    const id = request.params.id;
    const api = new Api();

    api.success = true;
    api.data = {
      title: request.payload.title,
      description: request.payload.description,
      done: request.payload.done,
      date: request.payload.date,
      id: request.payload.id,
    };

    return api;
  },
};
