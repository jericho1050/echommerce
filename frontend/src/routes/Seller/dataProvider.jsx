import drfProvider from "ra-data-django-rest-framework";
import { fetchUtils } from "react-admin";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Token ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const baseProvider = drfProvider(
  import.meta.env.VITE_REST_API_URL + "/api",
  httpClient
);
const createPostFormData = (params) => {
  const formData = new FormData();
  Object.keys(params.data).forEach((key) => {
    if (key === "image") {
      formData.append("image", params.data.image.rawFile);
    } else {
      formData.append(key, params.data[key]);
    }
  });
  return formData;
};

const dataProvider = {
  ...baseProvider,
  create: (resource, params) => {
    if (resource === "products") {
    if (resource === "products") {
      const formData = createPostFormData(params);
      return httpClient(`${import.meta.env.VITE_REST_API_URL}/api/products/`, {
        method: "POST",
        body: formData,
      }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }));
    }
    return baseProvider.create(resource, params);
  }
}
}

export { dataProvider };
