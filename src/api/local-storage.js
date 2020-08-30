const KEY = 'API_KEY';

const getApiKey = () => {
  return localStorage.getItem(KEY);
};

const setApiKey = (key) => {
  localStorage.setItem(KEY, key);
};

export {
  getApiKey,
  setApiKey
};
