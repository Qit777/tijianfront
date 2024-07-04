import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import 'font-awesome/css/font-awesome.min.css'

router.beforeEach(function(to,from,next){
    let users = sessionStorage.getItem('users');
    if(!(to.path=='/'||to.path=='/login'||to.path=='/register')){
        if(users==null){
            router.push('/login');
        }
    }
    next();
});

createApp(App).use(router).mount('#app')
