import axios from 'axios';

export default {
  currencyData(url) {
    const promise = axios.get(url)
    const dataPromise = promise.then((response) => response.data)
    return dataPromise
  },
};
