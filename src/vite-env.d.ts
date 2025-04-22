/// <reference types="vite/client" />

// 给window添加Skeleton类型
declare interface Window {
  $Skeleton: {
    genHtmlAndStyle: () => { html: string; styles: string[] };
    genSkeleton: (options?: object) => void;
  };
}

// 给 global 添加 Skeleton 类型
declare global {
  const $Skeleton: {
    genHtmlAndStyle: () => { html: string; styles: string[] };
    genSkeleton: (options?: object) => void;
  };
}