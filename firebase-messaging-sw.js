// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBXIfEFmRH9eCUqUZEba14Lou79ZpWsKRI",
    authDomain: "notifications-test-c2f35.firebaseapp.com",
    projectId: "notifications-test-c2f35",
    storageBucket: "notifications-test-c2f35.firebasestorage.app",
    messagingSenderId: "656684992609",
    appId: "1:656684992609:web:bf196050a552b7170ec220",
    measurementId: "G-81JS422NJG"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener('install', function(event) {
  console.log('Service Worker: Installed');
});

// Activate the worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activated');
});

messaging.onBackgroundMessage(async(payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  let notificationTitle = 'Background message title';
  let notificationBody = 'Background message body';
  try {
    const messageDetails = JSON.parse(payload.data.payload);
    notificationTitle = messageDetails.title || notificationTitle;
    notificationBody = messageDetails.body || notificationBody;
    console.log(messageDetails);
  } catch(err) {
  }
  // Customize notification here
  const notificationOptions = {
    body: notificationBody,
    icon: '/logo-vertical.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
  await fetch('/?source=worker');
});
