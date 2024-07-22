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
    <div class="container">
      <div class="subtitle">房间ID</div>
      <input v-on:input="checkRoomId" v-model="roomId" type="text" placeholder="房间ID" />
      <br />
      <button v-on:click="createRoom">创建房间</button>
      <br />
      <div>{{ info }}</div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'CreateRoomView',
  data () {
    return {
      roomId: 'sample',
      validRoomId: 'sample',
      info: '',
    }
  },
  computed: {
    server () {
      return this.$store.state.server
    }
  },
  methods: {
    createRoom () {
      if (this.validRoomId === '') {
        this.info = '房间ID不能为空！'
        return
      }
      this.info = '创建房间中...'
      //将validRoomId和validRoomPsw发送到后端
      //是否存在
      //console.log(`${this.server}/create/${this.validRoomId}/${this.validRoomPsw}/`)
      axios({
        method: 'get',
        url: `${this.server}/create/${this.validRoomId}/`,
      })
        .then((response) => {
          console.log(response.data)
          if (response.data === 'createdRoom') {
            this.updateRoomInfo()
            this.info = '创建成功，跳转中...'
            setTimeout(() => {
              this.$router.push({ path: '/joinroom' })
            }, 1000);
          } else {
            this.info = response.data
          }
        })
    },
    checkRoomId () {
      let flag = this.roomId.length <= 6;
      for (let i = 0; i < this.roomId.length && flag; i++) {
        let c = this.roomId.charAt(i)
        if (!(('0' <= c && c <= '9') || ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z'))) {
          flag = false;
        }
      }
      if (flag) {
        this.validRoomId = this.roomId
        this.updateRoomInfo()
      } else {
        this.roomId = this.validRoomId
      }
    },
    updateRoomInfo () {
      localStorage.setItem(`roomId`, this.validRoomId)
    },
  },
  mounted: function () {
    for (let i = 1; i <= 99999; i++)window.clearInterval(i)
    if (!(localStorage.getItem('roomId') === null)) {
      let tempRoomId = localStorage.getItem('roomId');
      this.roomId = tempRoomId;
      this.validRoomId = tempRoomId;
    }
  },

}
</script>
