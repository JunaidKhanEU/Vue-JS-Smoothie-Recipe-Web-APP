import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Addsmoothies from '@/components/AddSmoothies'
import EditSmoothies from '@/components/EditSmoothies'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-smoothies',
      name: 'AddSmoothies',
      component: Addsmoothies
    },
    {
      path: '/edit-smoothies/:smoothie_slug',
      name: 'EditSmoothies',
      component: EditSmoothies
    },{
      path:'**',
      component: Index
    }
  ]
})
