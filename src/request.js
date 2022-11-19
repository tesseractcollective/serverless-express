// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http

const { SECURE_EXPRESS } = process.env
const enableSecure = SECURE_EXPRESS?.toLowerCase() !== 'false'

const http = require('http')

const HTTPS_PORT = 443
const HTTP_PORT = 80

module.exports = class ServerlessRequest extends http.IncomingMessage {
  constructor ({ method, url, headers, body, remoteAddress }) {
    super({
      encrypted: enableSecure,
      readable: false,
      remoteAddress,
      address: () => ({ port: enableSecure ? HTTPS_PORT : HTTP_PORT }),
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
