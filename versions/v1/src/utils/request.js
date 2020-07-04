import axios from 'axios';

class Request {
  static async do(config, options = {}) {
    try {
      const client = axios.create(config);
      const result = await client(options);

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Request;