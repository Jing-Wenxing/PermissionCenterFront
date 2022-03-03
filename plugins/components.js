import Vue from 'vue'

import Navbar from '@/components/Base/Navbar/Navbar.vue'
import Footer from '@/components/Base/Footer/Footer.vue'
import AppMenu from '@/components/Base/Navbar/AppMenu.vue'
import Menu from '@/components/Base/Menu/Menu.vue'
import AtdTable from '@/components/Base/Table/Table.vue'
import AtdTemplate from '@/components/Base/Table/Template.vue'
import AtdDialog from '~/components/DiaLog/Base.vue'

Vue.component('Navbar', Navbar)
Vue.component('Footer', Footer)
Vue.component('AppMenu', AppMenu)
Vue.component('Menu', Menu)
Vue.component('AtdTable', AtdTable)
Vue.component('AtdTemplate', AtdTemplate)
Vue.component('AtdDialog', AtdDialog)