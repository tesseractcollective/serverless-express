// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http

const { NODE_ENV } = process.env

const http = require('http')

const HTTPS_PORT = 443
const HTTP_PORT = 80

module.exports = class ServerlessRequest extends http.IncomingMessage {
  constructor ({ method, url, headers, body, remoteAddress }) {
    super({
      encrypted: !(NODE_ENV === 'development'),
      readable: false,
      remoteAddress,
      address: () => ({ port: !(NODE_ENV === 'development') ? HTTP_PORT : HTTPS_PORT }),
      end: Function.prototype,
      destroy: Function.prototype
    })

    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: '1.1',
      httpVersionMajor: '1',
      httpVersionMinor: '1',
      method,
      headers,
      body,
      url
    })

    this._read = () => {
      this.push(body)
      this.push(null)
    }
  }
}
