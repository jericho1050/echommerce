import store from "../../slices/store";
import { login, logout, selectAuth } from "../../slices/auth";

const authProvider = {
  login: ({ email, password }) => {
    return store.dispatch(login({ email, password })).then((action) => {
      if (login.fulfilled.match(action)) {
        localStorage.setItem("token", action.payload);
      } else {
        throw new Error(action.payload);
      }
    });
  },
  logout: () => {
    store.dispatch(logout());
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () => {
    const state = store.getState();
    const { token } = selectAuth(state);
    return token ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      store.dispatch(logout());
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    try {
      const { id, fullName, avatar } = JSON.parse(localStorage.getItem("auth"));
      return Promise.resolve({ id, fullName, avatar });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export { authProvider };
