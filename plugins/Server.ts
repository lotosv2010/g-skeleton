import express from 'express'
import http from 'http'

interface IOptions {
  port: number
  staticDir: string,
  origin: string
}

class Server {
  private options: IOptions = {
    port: 8090,
    staticDir: './dist',
    origin: 'http://localhost:8090'
  }
  private app: any = null
  private listenServer: any = null
  constructor(options: IOptions) {
    this.options = options
  }
  listen() {
    const app = this.app = express()
    app.use(express.static(this.options.staticDir))
    this.listenServer = http.createServer(app)
    return new Promise((resolve, reject) => {
      this.listenServer.listen(this.options.port, (err: any) => {
        if (err) {
          reject(err)
        } else {
          console.log(`server listen at port: ${this.options.origin}`);
          resolve(null)
        }
      })
    })
  }
  async close() {
    return new Promise((resolve) =>{
      this.listenServer.close(() => {
        console.log('server closed!');
        resolve(null)
      })
    })
  }
}

export default Server