importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

const {setCatchHandler, setDefaultHandler,registerRoute} = workbox.routing;
const {NetworkOnly} = workbox.strategies;

const pageFallback = 'offline.html';
const imageFallback = "./windows11/LargeTile.scale-400.png";
const fontFallback = "/font.ttf";

setDefaultHandler(new NetworkOnly());

self.addEventListener('push', (event) => {
  event.waitUntil(
	self.registration.showNotification('new notification for no reason', {
	  icon: './android/android-launchericon-144-144.png',
	})
	);
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); 
  var fullPath = self.location.origin + event.notification.data.path; 
  clients.openWindow(fullPath); 
});
// self.addEventListener('sync', event => {
//   if (event.tag === 'database-sync') {
//     event.waitUntil(console.log("syncing bro"))
//   }
// });
function doTheWork(){
  console.log("you got offline bro")
  self.registration.showNotification('you got offline bro', {
	body: 'idk why am i sending notification',
	icon: './android/android-launchericon-144-144.png',
  })
  // let not = new Notification("you got offline bro")
}

self.addEventListener("offline",(events)=>{
  console.log(events);
  self.sync.register('offlines')
})

self.addEventListener('sync', event => {
  if (event.tag === 'offlines') {
	  event.waitUntil(
		doTheWork()
		);
  }
});
self.addEventListener('periodicsync', event => {
  if (event.tag === 'offlines') {
  event.waitUntil(
	doTheWork()
	);
  }
  // Check for correct tag on the periodicSyncPermissionsync event.
});
self.addEventListener('install', event => {
  const files = [pageFallback,"/sw.js","/font.ttf","/mainfest.json"];
  if (imageFallback) {
	files.push(imageFallback);
  }

  event.waitUntil(
	self.caches
	  .open('workbox-offline-fallbacks')
	  .then(cache => cache.addAll(files))
  );
});

const handler = async options => {
  const dest = options.request.destination;
  const cache = await self.caches.open('workbox-offline-fallbacks');

  if (dest === 'document') {
	return (await cache.match(pageFallback)) || Response.error();
  }

  if (dest === 'image' && imageFallback !== false) {
	return (await cache.match(imageFallback)) || Response.error();
  }

  if (dest === 'font') {
	return (await cache.match(fontFallback)) || Response.error();
  }

  return Response.error();
};

setCatchHandler(handler);