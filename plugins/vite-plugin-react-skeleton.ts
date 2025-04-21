import Server from './Server'

interface IOptions {
  staticDir: string,
  port: number,
  origin: string
}

interface ICtx {
  path: string
  filename: string
  server?: any
  bundle?: any
  chunk?: any
  originalUrl?: string
}

// 创建插件
export default function reactSkeletonPlugin(options: IOptions) {
  const { staticDir, port, origin } = options;

  return {
    name: 'vite-plugin-react-skeleton',
    transformIndexHtml(html: string, ctx: ICtx) {
      const modifiedHtml = html;
      // 启动服务器
      const server = new Server(options)
      server.listen()
      console.log(html, ctx.originalUrl, staticDir, port, origin)
      // 生成骨架屏
      // TODO
      // 关闭服务器
      server.close()
      return modifiedHtml;
    }
  }
}