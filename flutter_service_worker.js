'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"main.dart.js": "633db24962292bac92ea480459d5ffcd",
"flutter_bootstrap.js": "47ede3cd6f5eefafbf89e8e3d8202166",
"version.json": "2ff5214adf3266c83a43fa4db09ca95e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/NOTICES": "ccdd779e7c4017502c1a19e080d74abc",
"assets/AssetManifest.json": "5e5eb5bad1023e1c3ba747914198d4be",
"assets/1.mp3": "92c7ca50b89fb8d2bf55694ad968a3ae",
"assets/AssetManifest.bin": "c259e2593db14ffe22a3be9cac4d6191",
"assets/fonts/MaterialIcons-Regular.otf": "96627e79febbacb58303468221de7a4c",
"assets/3.mp3": "38c85f4a4b88a94bcead36bf8f815c0b",
"assets/assets/songList.svg": "eee0d2513b7bb4e15ca81e9de0090402",
"assets/assets/download.svg": "44717702bdd48cef2983d46b30e535b5",
"assets/assets/play.svg": "15cb786102b04d4e6670318513e480f0",
"assets/assets/flecha_abajo.svg": "562b27c7e6237cdc4a1d58911a2b4148",
"assets/assets/note.svg": "3301190329331173927b0b0680e832af",
"assets/assets/check.svg": "fa73ff0ee2c212f060ffb5dcee8b7388",
"assets/assets/data.json": "dd2f77b96ae56e7c9990a9f4f2e7befb",
"assets/assets/1.mp3": "92c7ca50b89fb8d2bf55694ad968a3ae",
"assets/assets/3.mp3": "38c85f4a4b88a94bcead36bf8f815c0b",
"assets/assets/user.svg": "bd83d22afc3dc5c9553e7d49d9577db4",
"assets/assets/nubeOk.svg": "35d4330913b02a5e6f806c2affb605cd",
"assets/assets/prev.svg": "316059e5e8c89d29e9e7506e5c634318",
"assets/assets/view-columns-svgrepo-com.svg": "5f5b0f9b3e293f22f1d4f7646c8e46af",
"assets/assets/code.svg": "09e89f8d7269ef0414ed33f503ba4e69",
"assets/assets/fast-forward-svgrepo-com.svg": "009a7cf04e26e79c079bc4e89ca59ab6",
"assets/assets/lyric.svg": "78f2bf7824cbc9305febee9cdccb19d0",
"assets/assets/next.svg": "f4d53a18654507da2730b0194081b761",
"assets/assets/search.svg": "eb1c798b3f1259731bad19fd72692777",
"assets/assets/fast-rewind-svgrepo-com.svg": "6418570dc5cbaac7e3fb70ac7a017d27",
"assets/assets/2.mp3": "0a449f6e328a050cff7e26773a3399d9",
"assets/assets/pause.svg": "06567d87fde3b2d1ac10aae70353a72d",
"assets/assets/cloud-disconnect-svgrepo-com.svg": "8bf2f56364ff949fe2d573e7d7db5bf6",
"assets/AssetManifest.bin.json": "8a889ad9a99d833ae2f05c5f79b674a5",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/2.mp3": "0a449f6e328a050cff7e26773a3399d9",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "dfc6987ce9a2f5a5522c70190aa9c6e9",
"index.html": "83dbb7f88d8686644b0c358c662029d3",
"/": "83dbb7f88d8686644b0c358c662029d3",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
