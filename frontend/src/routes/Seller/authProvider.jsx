import store from "../../slices/store";
import { login, logout, authSelector } from "../../slices/auth";

const authProvider = {
  login: ({ email, password }) => {
    return store.dispatch(login({ email, password })).then((action) => {
      if (login.fulfilled.match(action)) {
        const { token, role } = action.payload;
        if (role === "seller") {
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);

        } else {
          throw new Error("Unauthorized role");
        }
      } else {
        throw new Error(action.payload);
      }
    });
  },
  logout: () => {
    store.dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return Promise.resolve();
  },
  checkAuth: () => {
    const state = store.getState();
    const { token } = authSelector(state);
    return token ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      store.dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    try {
      const state = store.getState();
      const { id, fullName, avatar } = authSelector(state);
      return Promise.resolve({ id, fullName, avatar });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export { authProvider };