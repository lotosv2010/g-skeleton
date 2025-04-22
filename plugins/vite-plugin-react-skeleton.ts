import Server from './Server'
import Skeleton from './Skeleton'

interface IOptions {
  staticDir: string,
  port: number,
  origin: string
  viewport: {
    width: number,
    height: number,
    deviceScaleFactor: number
  }
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
  const { staticDir, port, origin, viewport } = options;

  return {
    name: 'vite-plugin-react-skeleton',
    async transformIndexHtml(html: string, ctx: ICtx) {
      const modifiedHtml = html;
      // 启动服务器
      const server = new Server(options)
      server.listen()
      console.log(html, ctx.originalUrl, staticDir, port, origin)
      // 生成骨架屏
      const skeleton= new Skeleton({
        viewport
      });
      await skeleton.initialize();
      const skeletonHtml = await skeleton.genHtml(origin);
      console.log('skeletonHtml',skeletonHtml);
      await skeleton.destroy();
      // 关闭服务器
      server.close()
      return modifiedHtml;
    }
  }
}