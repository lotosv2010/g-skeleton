var $$ = document.querySelectorAll.bind(document);
var REMOVE_TAGS = ['script', 'style', 'noscript', 'meta', 'link'];

window.$Skeleton = {
  genSkeleton: (options = {}) => {
    console.log('genSkeleton', options);
  },
  genHtmlAndStyle: () => {
    const styles = Array.from($$('style')).map((style) => style.innerHTML || style.innerText);
    Array.from($$(REMOVE_TAGS.join(','))).forEach((ele) => ele?.parentNode?.removeChild?.(ele));
    const html = document.body.innerHTML;
    return {
      html,
      styles
    }
  }
}