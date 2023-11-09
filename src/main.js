import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from './router/router'
import directivs from './directivs'
import store from './store'

const app = createApp(App)

components.forEach(component => app.component(component.name, component))

directivs.forEach(directive => app.directive(directive.name, directive))

app.use(router);
app.use(store)
app.mount('#app');
