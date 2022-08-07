<!--
 Copyright (C) 2022 Zijun Yang <zijun.yang@outlook.com>
 
 This file is part of God of Avalon Frontend.
 
 God of Avalon Frontend is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 God of Avalon Frontend is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with God of Avalon Frontend.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <div>
    <!--
    <button v-on:click="trypost">trypost button</button>
    -->
    <div class="container">
      <div class="subtitle">No Home Page</div>
      Caviar is lazy.
    </div>
  </div>
</template>
<script>

import axios from "axios"
import Vue from "vue"
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
axios.defaults.withCredentials = true
export default {
  name: 'HomeView',
  components: {

  },
  data () {
    return {
      token: ''
    }
  },
  computed: {
    server () {
      return this.$store.state.server
    }
  },
  methods: {
    trypost () {

      axios({
        headers: {
          'X-CSRFToken': this.token,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        url: `${this.server}/test/`,
        method: 'post',
        data: {
          'data1': 'data2',
        }
      })
        .then((res) => {
          console.log(res)
        })
    },

    gettoken () {
      axios({
        method: 'get',
        url: `${this.server}/get_csrf_token/`,
        withCredentials: true
      })
        .then((res) => {
          this.token = res.data.token
          //console.log(this.token)
        })
    },
  },
  mounted: function () {
    for (let i = 1; i <= 99999; i++)window.clearInterval(i)
    //get token
    this.gettoken()
  },
}
</script>
