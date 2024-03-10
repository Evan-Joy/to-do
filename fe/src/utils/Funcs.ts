import axios from 'axios';
import { IDataAxiosResponse } from "./Interfaces";

let numberLogId = 0;

class Funcs {
  static fun_log = (value: any, file?: any, line?: number) => {
    if (String(process.env.REACT_APP_DEBUG_MODE) === 'TRUE') {
      const group = file || 'Other Logs';
      const lineLog = line || 'NULL';
      console.group(`File: ${group}, Line: ${lineLog}`);
      const logHeader = `======== DEBUG LOG MODE [ File: ${group} ; Line: ${lineLog} ; logId: ${numberLogId++}] ========`;
      console.log(logHeader);
      console.log(value);
      let logFooter = '';
      const mid = logHeader.length / 2;
      for (let i = 0; i < logHeader.length; i++) {
        if (i < mid - 5 || i > mid + 5)
          logFooter += '='
        else
          logFooter += '-'
      }
      console.log(logFooter);
      if (numberLogId > 100) numberLogId = 0;
      console.groupEnd();
    }
  };

  static fun_getSuccessAxiosResponse = (res: any) => {
    const resFromServer = res.data;
    const result: IDataAxiosResponse = {
      success: resFromServer.success,
      result: resFromServer.result,
      message: resFromServer.message,
      error: resFromServer.error,
      total: resFromServer.total,
    };
    return result;
  }

  static fun_getErrorAxiosResponse = (err: any) => {
    const result: IDataAxiosResponse = {
      success: false,
      error: err,
    };
    return result;
  }

  static fun_get = async (url: string, config?: any): Promise<IDataAxiosResponse> => {
    return new Promise((resolve, _reject) => {
      axios.get(url, config)
        .then((res) => {
          resolve(Funcs.fun_getSuccessAxiosResponse(res));
        })
        .catch((err) => {
          resolve(Funcs.fun_getErrorAxiosResponse(err));
        });
    });
  };

  static fun_post = async (url: string, data?: any, config?: any): Promise<IDataAxiosResponse> => {
    return new Promise((resolve, _reject) => {
      axios.post(url, data, config)
        .then((res) => {
          resolve(Funcs.fun_getSuccessAxiosResponse(res));
        })
        .catch((err) => {
          resolve(Funcs.fun_getErrorAxiosResponse(err));
        });
    });
  };

  static fun_put = async (url: string, data?: any, config?: any): Promise<IDataAxiosResponse> => {
    return new Promise((resolve, _reject) => {
      axios.put(url, data, config)
        .then((res) => {
          resolve(Funcs.fun_getSuccessAxiosResponse(res));
        })
        .catch((err) => {
          resolve(Funcs.fun_getErrorAxiosResponse(err));
        });
    });
  };

  static fun_delete = async (url: string, config?: any): Promise<IDataAxiosResponse> => {
    return new Promise((resolve, _reject) => {
      axios.delete(url, config)
        .then((res) => {
          resolve(Funcs.fun_getSuccessAxiosResponse(res));
        })
        .catch((err) => {
          resolve(Funcs.fun_getErrorAxiosResponse(err));
        });
    });
  };
}

export default Funcs;