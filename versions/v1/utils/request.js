import axios from 'axios';

class Request {
  static async do(config, options = {}) {
    try {
      const client = axios.create(config);
      const { data } = await client(options);

      return data;
    } catch(error) {
    }
  }
}

export default Request;