import httpService from "./http.service";

const todosEndPoint = "todos/";

const todosService = {
    fetchAll: async (userId) => {
        const { data } = await httpService.get(todosEndPoint, {
            params: { userId },
        });

        return data;
    },

    add: async (todo) => {
        const { data } = await httpService.post(todosEndPoint, todo);

        return data;
    },

    important: async (id) => {
        const { data } = await httpService.put(
            todosEndPoint + `important/${id}`,
            {
                id,
            }
        );

        return data;
    },

    edit: async (payload) => {
        const { data } = await httpService.patch(
            todosEndPoint + `edit/${payload._id}`,
            payload
        );

        return data;
    },

    new: async (id) => {
        const { data } = await httpService.put(todosEndPoint + `new/${id}`, {
            id,
        });

        return data;
    },

    inWork: async (id, drop) => {
        const { data } = await httpService.put(todosEndPoint + `inwork/${id}`, {
            id,
            drop,
        });

        return data;
    },

    complete: async (id, drop) => {
        const { data } = await httpService.put(
            todosEndPoint + `complete/${id}`,
            {
                id,
                drop,
            }
        );

        return data;
    },

    delete: async (id) => {
        const { data } = await httpService.delete(
            todosEndPoint + `delete/${id}`,
            { id }
        );

        return data;
    },

    fetchAllforAll: async (userId) => {
        const { data } = await httpService.get(todosEndPoint + "all", {
            params: { userId },
        });

        return data;
    },
};

export default todosService;
