import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const searchURL: string = "/search.json";

const appendURLParams = (endpoint: string, value: string) => {
  const url = new URL(instance.getUri() + endpoint);
  url.searchParams.append("q", value);
  return url.toString();
};

const getBooks = (payload: string) => {
  return instance.get(appendURLParams(searchURL, payload));
};

export { getBooks };
