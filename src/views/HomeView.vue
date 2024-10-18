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
      <div class="subtitle">--help</div>
        要使用此网站玩《阿瓦隆：抵抗组织》，首先需要创建一个房间。
        <br><br>
      <b>创建房间：</b>
      如果你还没有创建房间，请前往“创建房间”选项卡，在那里你需要选择房间ID。
      <br><br>
      <b>创建玩家/加入房间：</b>
      如果房间已经创建，请前往“加入房间”选项卡，在那里你需要选择玩家ID并设置密码。如果该房间中尚未创建此玩家ID，将会初始化一个新玩家。
      <hr>
      <b>反馈：</b>如果你找到了bug，或者有任何想法，欢迎到这个项目的github repo新增issue（<a href="https://github.com/zpatronus/GodOfAvalon-frontend">前端</a>，<a href="https://github.com/zpatronus/GodOfAvalon-backend">后端</a>）；如果你不熟悉github，或者只是想留个言，也可以填写
      <a href="https://forms.gle/g6kHoRVJ7qCBM5598">Google Form</a>。
      <hr>
      <b>支持这个网站：</b>
      <a href="https://www.paypal.com/paypalme/zijunhz/0.7USD">我的PayPal</a> 
      <br>
      God of Avalon是我在大二时苦于找不到合适的线上阿瓦隆平台、顺便练手Vue+Django的小项目。后续一直陆陆续续更新功能并上线公网。小服务器和域名每年成本大约60USD，并不高。如果能得到您的支持，我会非常感激，默认金额仅0.7USD，谢谢！
    </div>
  </div>
</template>
<script>

import axios from "axios"
// import Vue from "vue"
// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)
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
