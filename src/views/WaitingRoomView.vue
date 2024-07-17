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
      <div>{{ roomId }}</div>
      <div class="subtitle">你的玩家ID</div>
      <div>{{ userId }}</div>
      <div class="subtitle">玩家数量</div>
      <div>{{ userCount }}</div>
      <div class="subtitle">房间内的玩家</div>
      <div v-for="user in users">{{ user.userId }}</div>
    </div>
    <div class="container">
      <div class="subtitle">板子</div>
      <div>{{ template }}</div>
      <div class="subtitle">任务队成员数量</div>
      <div>{{ teamBuildingPhase }}</div>
    </div>
    <button id="startGameButton" v-on:click="startGame" class="disabledButton">开始游戏</button>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'WaitingRoomView',
  data () {
    return {
      roomId: '',
      userId: '',
      userPsw: '',
      users: [],
      userCount: 0,
    }
  },
  computed: {
    template: function () {
      if (this.userCount < 5) return '玩家数量不足'
      if (this.userCount > 10) return '玩家数量过多，请重开房间'
      let templates = [
        '',
        '',
        '',
        '',
        '',
        '梅林、派西维尔、莫甘娜、刺客、1名亚瑟的忠臣',
        '梅林、派西维尔、莫甘娜、刺客、2名亚瑟的忠臣',
        '梅林、派西维尔、莫甘娜、刺客、奥伯伦、2名亚瑟的忠臣',
        '梅林、派西维尔、莫德雷德、莫甘娜、刺客、3名亚瑟的忠臣（建议使用湖中仙女）',
        '梅林、派西维尔、莫德雷德、莫甘娜、刺客、4名亚瑟的忠臣（建议使用湖中仙女）',
        '梅林、派西维尔、莫德雷德、莫甘娜、刺客、4名亚瑟的忠臣、莫德雷德的爪牙（建议使用湖中仙女）'
      ];
      // let templates = ['', '', '', '', '', 'Merlin, Percival, Morgana, Assassin, 1 Loyal Servant of Arther', 'Merlin, Percival, Morgana, Assassin, 2 Loyal Servants of Arther', 'Merlin, Percival, Morgana, Assassin, Oberon, 2 Loyal Servants of Arther', 'Merlin, Percival, Mordred, Morgana, Assassin, 3 Loyal Servants of Arther (Lady of the Lake is recommended)', 'Merlin, Percival, Mordred, Morgana, Assassin, 4 Loyal Servants of Arther  (Lady of the Lake is recommended)', 'Merlin, Percival, Mordred, Morgana, Assassin, 4 Loyal Servants of Arther, Minion of Mordred (Lady of the Lake is recommended)']
      //                                    5                                                                 6                                                                  7                                                                            8                                                                                                                       9                                                                                                     10 
      return templates[this.userCount]
    },
    teamBuildingPhase: function () {
      if (this.userCount < 5) return '玩家数量不足'
      if (this.userCount > 10) return '玩家数量过多，请重开房间'
      let teamBuildingPhases = [
        '', '', '', '', '',
        '2 3 2 3 3',
        '2 3 4 3 4',
        '2 3 3 4（保护轮）4',
        '3 4 4 5（保护轮）5',
        '3 4 4 5（保护轮）5',
        '3 4 4 5（保护轮）5'
      ];
      // let teamBuildingPhases = ['', '', '', '', '', '2 3 2 3 3', '2 3 4 3 4', '2 3 3 4(Protected Quest) 4', '3 4 4 5(Protected Quest) 5', '3 4 4 5(Protected Quest) 5', '3 4 4 5(Protected Quest) 5']
      return teamBuildingPhases[this.userCount]
    },
    server () {
      return this.$store.state.server
    },
  },
  methods: {
    startGame () {
      axios({
        method: 'get',
        url: `${this.server}/start/${this.roomId}/${this.userId}/${this.userPsw}/`
      })
        .then((response) => {
          console.log(response.data)
          this.$router.push({ path: '/inroom' })
        })
    },
  },
  mounted: function () {
    this.roomId = localStorage.getItem('roomId')
    this.userId = localStorage.getItem('userId')
    this.userPsw = localStorage.getItem('userPsw')
    for (let i = 1; i <= 99999; i++)window.clearInterval(i)

    setInterval(() => {//update room info
      axios({
        method: 'get',
        url: `${this.server}/wait/${this.roomId}/${this.userId}/${this.userPsw}/`,
      })
        .then((response) => {
          //console.log(typeof (response.data))
          //reponseParse = JSON.parse(response.data)
          this.userCount = response.data['userCount']
          this.users = []
          for (let useri = 1; useri <= this.userCount; useri++) {
            //this.users[useri] = response.data['user' + useri]
            this.users.push({ 'userId': response.data['user' + useri] })
          }
          //console.log(this.users)

          let startRoomButton = document.getElementById('startGameButton')
          if (this.userCount < 5 || this.userCount > 10) {
            startRoomButton.classList.add('disabledButton')
          } else {
            startRoomButton.classList.remove('disabledButton')
          }

          if(response.data['roomstatus']=='started'){
            this.$router.push({ path: '/inroom' })
          }
        })
    }, 1000)
  }
}
</script>
