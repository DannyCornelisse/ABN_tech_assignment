import { createApp } from "vue";

import App from "./App.vue";
import ShowListComponent from "./components/ShowListComponent.vue";
import ShowTileComponent from "./components/ShowTileComponent.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
app.use(router);

app.mount("#app");

app.component("ShowListComponent", ShowListComponent);
app.component("ShowTileComponent", ShowTileComponent);
