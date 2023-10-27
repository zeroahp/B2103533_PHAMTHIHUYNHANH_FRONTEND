
import { createApp } from 'vue'
import App from './App.vue'
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';

// library.add(fas);
// app.component('font-awesome-icon', FontAwesomeIcon);
// router
import router from "./router";

createApp(App).use(router).mount("#app");

