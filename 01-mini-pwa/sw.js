self.addEventListener('install', event => {
    console.log('Installation du Service Worker...');
});

self.addEventListener('activate', event => {
    console.log('Activation du Service Worker...');
});