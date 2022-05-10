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
