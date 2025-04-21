interface IOptions {
  routes: string[];
  skeletonMap: Record<string, string>;
}

interface ICtx {
  path: string
  filename: string
  server?: unknown
  bundle?: unknown
  chunk?: unknown
}

export default function reactSkeletonPlugin(options: IOptions) {
  const { routes = [], skeletonMap = {} } = options;

  return {
    name: 'vite-plugin-react-skeleton',
    transformIndexHtml(html: string, { path }: ICtx) {
      const matchedRoute = routes.find(route => path.startsWith(route));
      if (matchedRoute && skeletonMap[matchedRoute]) {
        const skeletonHTML = skeletonMap[matchedRoute];
        // 简单注入骨架屏到 #root 占位符中
        return html.replace(
          /<div id="root"><\/div>/,
          `<div id="root">${skeletonHTML}</div>`
        );
      }
      return html;
    }
  }
}