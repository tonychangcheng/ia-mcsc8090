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
      <div class="subtitle">玩家ID</div>
      <input v-on:input="checkUserId" v-model="userId" type="text" placeholder="玩家ID" />
      <br />
      <div class="subtitle">玩家密码</div>
      <input v-on:input="checkUserPsw" v-model="userPsw" type="text" placeholder="玩家密码" />
      <ul>
        <li>
          不要使用你的常用密码，密码会被明文传输
        </li>
        <li>
          玩家密码不是房间密码，网站不存在房间密码
        </li>
        <li>
          玩家应当设置自己的密码，防止同一房间他人偷窥自己身份
        </li>
        <li>
          建议随机输入，网站会将密码保存在本地，刷新后也不会丢失，并会自动填入
        </li>
      </ul>
      <br />
      <button v-on:click="joinRoom">加入房间</button>
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
      userId: 'sample',
      userPsw: 'sample',
      validRoomId: 'sample',
      validUserId: 'sample',
      validUserPsw: 'sample',
      info: '',
      //server: 'http://59.78.35.89:7999',
    }
  },
  computed: {
    server () {
      return this.$store.state.server
    }
  },
  methods: {
    joinRoom () {
      if (this.validRoomId === '') {
        this.info = '房间ID不能为空！'
        return
      }
      if (this.validUserId === '') {
        this.info = '玩家ID不能为空！'
        return
      }
      if (this.validUserPsw === '') {
        this.info = '密码不能为空！'
      }
      this.info = '加入房间中...'
      //将validRoomId和validRoomPsw发送到后端
      //是否存在
      //console.log(`${this.server}/create/${this.validRoomId}/${this.validRoomPsw}/`)
      axios({
        method: 'get',
        url: `${this.server}/join/${this.validRoomId}/${this.validUserId}/${this.validUserPsw}/`,
      })
        .then((response) => {
          let tReData = response.data
          if (tReData != 'createdUser' && tReData != 'userExistAndValid') {
            this.info = tReData
            return
          }
          if (tReData === 'createdUser') {
            this.info = '成功创建玩家，跳转中...'
          }
          if (tReData === 'userExistAndValid') {
            this.info = '成功登录，跳转中...'
          }
          axios({
            method: 'get',
            url: `${this.server}/status/${this.validRoomId}/`,
          })
            .then((response) => {
              let tReData = response.data
              //console.log(tReData)
              if (tReData === 'waiting') {
                this.$router.push({ path: '/waitingroom' })
              } else {
                this.$router.push({ path: '/inroom' })
              }
            })
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
    checkUserId () {
      let flag = this.userId.length <= 7;
      for (let i = 0; i < this.userId.length && flag; i++) {
        let c = this.userId.charAt(i)
        if (!(('0' <= c && c <= '9') || ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z') || (c === '_'))) {
          flag = false;
        }
      }
      if (flag) {
        this.validUserId = this.userId
        this.updateRoomInfo()
      } else {
        this.userId = this.validUserId
      }
    },
    checkUserPsw () {
      let flag = this.userPsw.length <= 6;
      for (let i = 0; i < this.userPsw.length && flag; i++) {
        let c = this.userPsw.charAt(i)
        if (!(('0' <= c && c <= '9') || ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z'))) {
          flag = false;
        }
      }
      if (flag) {
        this.validUserPsw = this.userPsw
        this.updateRoomInfo()
      } else {
        this.userPsw = this.validUserPsw
      }
    },
    updateRoomInfo () {
      localStorage.setItem(`roomId`, this.validRoomId)
      localStorage.setItem(`userId`, this.validUserId)
      localStorage.setItem(`userPsw`, this.validUserPsw)
    }
  },
  mounted: function () {
    for (let i = 1; i <= 99999; i++)window.clearInterval(i)
    if (!(localStorage.getItem('roomId') === null)) {
      let tempRoomId = localStorage.getItem('roomId');
      this.roomId = tempRoomId;
      this.validRoomId = tempRoomId;
    }
    if (!(localStorage.getItem('userId') === null || localStorage.getItem('userPsw') === null)) {
      let tempUserId = localStorage.getItem('userId'), tempUserPsw = localStorage.getItem('userPsw');
      this.userId = tempUserId;
      this.validUserId = tempUserId;
      this.userPsw = tempUserPsw;
      this.validUserPsw = tempUserPsw;
    } else {
      this.updateRoomInfo();
    }
  },
}
</script>
