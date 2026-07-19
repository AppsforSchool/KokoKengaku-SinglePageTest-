const firebaseConfig = {
  apiKey: "AIzaSyAqIiNj0N4WruPSOkWbeo5gxzsNyeMkuLo",
  authDomain: "appsforschool-study.firebaseapp.com",
  projectId: "appsforschool-study",
  storageBucket: "appsforschool-study.firebasestorage.app",
  messagingSenderId: "740735293440",
  appId: "1:740735293440:web:982702b6d53aaa18ec60e5"
};

// Firebase 初期化とサービス取得
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let myUserId = "";
let myUid = "";
let meIsAdmin = false;

let talkId = "";

let userDataCache = {};
let userLastCheckedCache = {}; // ★ 最終確認日時用のキャッシュを追加
let currentRoomMembers = [];   // ★ 現在のルームのメンバーIDリストを保持する変数を追加

// onSnapshotのリスナー解除用
let memberSubscribers = [];
