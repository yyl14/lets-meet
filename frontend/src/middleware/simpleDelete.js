import print from "./test";

const URL = {
  deleteRoutine: "/routine",
};

export default (instance) =>
  Object.keys(URL).reduce((acc, curr) => {
    acc[curr] = async (data) => {
      try {
        if (print) console.log("DELETE", URL[curr], "req:", data);
        const { data: result } = await instance.delete(URL[curr], { data });
        if (print) console.log("DELETE", URL[curr], "res", result);
        return result;
      } catch (error) {
        throw error;
      }
    };
    return acc;
  }, {});
