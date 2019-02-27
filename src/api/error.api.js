import _ from 'lodash';

export default class ErrorHandler {
  constructor(response) {
    this.error = this.processError(response);
  }

  processError(response) {
    //for code 403
    if (_.includes(response, '403')) {
      return {
        response,
        message: 'is already in use',
        code: 403
      };
    }
    //for code 400
    else if (_.includes(response, 400)) {
      return {
        response,
        message: 'Network request failed',
        code: 400
      };
    }
    //for code 401
    else if (_.includes(response, 401)) {
      return {
        response,
        message: 'Not authorized',
        code: 401
      };
    }
  }
}
