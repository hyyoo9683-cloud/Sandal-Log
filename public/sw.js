// 최소한의 서비스 워커 - PWA 설치 요건 충족용 (오프라인 캐싱은 하지 않음)
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', () => {
  // 패스스루: 네트워크 요청을 그대로 통과시킴
})
