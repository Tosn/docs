### 打点上报
- Img src或者new Image
- navigator.sendBeacon

### 广告展示多少(展示区域)
IntersectionObserver

```ts
var observerOptions = {
  threshold: 0.5 // 比例
}
function intersectionCallback (entries) {
  if (entries[0].isIntersecting && !hasLoad) { // 如果满足条件
    interval = setTimeout(function () {
      sendBeacon(_o.viewNotices)
      hasLoad = true
      clearIntervalFn()
    }, _o.time)
  } else if(!entries[0].isIntersecting) {
    clearIntervalFn()
  }
}
var observer = new IntersectionObserver(intersectionCallback, observerOptions)
observer.observe(_el)
```

