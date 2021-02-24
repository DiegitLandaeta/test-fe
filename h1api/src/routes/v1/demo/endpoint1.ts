import joi from "@hapi/joi";
import Api from "../../../models/Api";

export default {
  method: "GET",
  path: `/v1/demo/tasks`,
  options: {
    description: "Get Tasks",
    tags: ["demo"],
    notes: [],
    auth: false,
  },
  handler: async (request, h) => {
    const api = new Api();

    const hasError = false;

    if (hasError) {
      api.success = false;
      api.code = "code-data-error";
      api.message = "A test error message";

      return api;
    }

    api.success = true;
    api.data = [
      {
        title: "Hacer la compra",
        description: "Ir al mercadona a por la compra",
        done: true,
        date: "13/02/2021",
        id: 1,
      },
      {
        title: "Llevar a los niños al cole",
        description:
          "Llevar a Luca y Pablo al cole (recordar que Pablo tiene práctica de football)",
        done: true,
        date: "09/02/2021",
        id: 2,
      },
      {
        title: "Hacer la cena",
        description: "Preparar hamburguesas",
        done: false,
        date: "10/02/2021",
        id: 3,
      },
      {
        title: "Llevar el coche al mecánico",
        description: "Llevar el corolla a reparar",
        done: true,
        date: "13/02/2021",
        id: 4,
      },
      {
        title: "Lavar el coche",
        description: "Pasar por el lavado de coches",
        done: false,
        date: "14/02/2021",
        id: 5,
      },
    ];

    return api;
  },
};
