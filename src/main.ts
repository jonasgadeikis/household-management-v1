import { createApp } from 'vue'
import './style.css'
import router from "./router";
import App from './App.vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass';

const app = createApp(App);

app.use(router);
app.use(Quasar, {
    plugins: {},
});

// app.config.globalProperties.constants = constants; // Come back to this, somehow does not work

app.mount('#app')
