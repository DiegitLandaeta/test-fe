"use strict";

import Hapi from "@hapi/hapi";
import routes from "../routes";

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: "127.0.0.1",
  routes: {
    cors: {
      headers: ["Accept", "Content-Type"],
      origin: ["*"],
    },
    validate: {
      failAction: async (request, h, err) => {
        if (err.isJoi) {
          console.log(err.message);
        }
      },
    },
  },
});

const init = async () => {
  const validate = async function (decoded, request, callback) {
    return { isValid: true };
  };

  routes.register(server);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();

export default server;
