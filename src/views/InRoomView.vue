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
      <div class="subtitle">对局信息</div>
      <div>房间ID: {{ roomId }}</div>
      <div>你的玩家ID: {{ userId }}</div>
      <div>玩家数量: {{ userCount }}</div>
      <!--
    <div class="subtitle">房间内的玩家</div>
    <div v-for="user in users">{{ user.userId }}</div>
  -->
      <div class="subtitle">板子</div>
      <div>{{ template }}</div>

    </div>

    <div class="container">
      <details ref="details" @toggle="toggleDetails">
        <summary>
          <div class="subtitle">{{ summaryText }}</div>
        </summary>
        <div>{{ chineseRoleName }}</div>
        <div class="subtitle">{{ roleUserSee }}</div>
        <div>{{ userSeeString }}</div>
      </details>
    </div>

    <div class="container" style="padding:0" v-if="messages.length > 0">
      <div class="subtitle">历史记录</div>
      <div v-for="message in messages">
        <div :style="getBackgroundStyle(message)">
          <div style="padding:0 7px 0 7px; line-height: 1.2rem">
            <hr style="margin: -2px 0 7px 0">
            <div class="subsubtitle">{{ message.messagetitle }}</div>
            <div>{{ message.messageusers }}</div>
            <div class="green">{{ message.message1users }}</div>
            <div class="red">{{ message.message2users }}</div>
          </div>
        </div>
      </div>
    </div>

    <div id="votepart" class="hidden container">
      <div class="subtitle">{{ votetitle }}</div>
      <div>{{ votecontent }}</div>
      <button v-on:click="chooseYes">✔️</button>
      <button id="nobutton" class="disabledButton" v-on:click="chooseNo">❌</button>
      <div id="confirmchoiceinfo" class="hidden">你选择了 "{{ userChoiceEmoji }}"</div>
      <button id="confirmchoicebutton" class="hidden" v-on:click="confirmChoice">确认</button>
    </div>

    <div class="container hidden" id="teambuilding">
      <div class="subtitle">任务队伍成员数量</div>
      <div style="text-align: center;">{{ teamBuildingPhase }}</div>
      <hr>
      <div class="subtitle">组建任务队伍&笔记</div>

      <div v-for="user in users" style="display: flex;">

        <div class="checkbox-wrapper-60" style="margin-right: auto ; ">
          <input type="checkbox" class="check" :id="user.userId" :value="user.userId" v-model="selectedUsers"
            @change="changeTeamUser" />
          <label :for="user.userId" style="margin-right: auto; " class="label">
            <svg viewBox="0 0 65 65" height="30" width="30">
              <rect x="7" y="7" width="50" height="50" stroke="white" fill="none" />
              <g transform="translate(-15,-970.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4 "
                  stroke="white" stroke-width="3" fill="none" class="path1" />
              </g>
            </svg>
            <span> {{ user.userId }}</span>
          </label>
        </div>

        <div style=" font-size: 1.5rem;  line-height: 2rem; margin-bottom: 0.5rem;">
          <div v-for="emoji in emojis" class="grayscale" style="display: inline; cursor: default;"
            @click="toggleGrayscale($event)">{{ emoji }}</div>
        </div>



      </div>

      <div>
        你的任务队伍是：
        <div v-if="selectedUsers.length === 0" style="display: inline;">∅</div>
        <div v-for="(u, index) in selectedUsers" :key="index" style="display: inline;">
          {{ u }}<span v-if="index < selectedUsers.length - 1">, </span>
        </div>
      </div>
      <div v-if="!selectedUsers.includes(userId)">
        你没有在队伍提名中包含自己，你确定吗？
      </div>
      <button v-on:click="preDoQuestNew" :class="{ disabledButton: selectedUsers.length < 2 }">确定任务队伍人选</button>
      <button v-on:click="doQuestNew" v-if="preQuestDone">发起任务队伍投票</button>
    </div>
    <div>{{ info }}</div>


    <div style="margin-bottom:100px"></div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'InRoomView',
  data () {
    return {
      emojis: ['🟦', '🧙‍♂️', '🛡️', '🔪', '😈', '🟧',],
      summaryText: '你的角色（点击以展示）',
      roomId: '',
      userId: '',
      userPsw: '',
      users: [],
      userCount: 0,
      userRole: '',
      roleUserSee: '',
      usersUserSee: [],
      selectedUsers: [],
      messages: [],
      messagecount: 0,
      preQuestDone: false,
      showvotecontainer: false,
      showbuildcontainer: false,
      votetitle: 'this is vote title',
      votecontent: 'this is vote content',
      userChoice: 'Yes',
      userChoiceEmoji: '✔️',
      token: '',
      info: '',
      intervalId: null,
    }
  },
  computed: {
    userSeeString () {
      return this.usersUserSee.map(user => user.userId).join(', ');
    },
    template: function () {
      if (this.userCount < 5) return '玩家数量不足'
      if (this.userCount > 10) return '玩家数量过多，请重开房间'
      let templates = [
        '',
        '',
        '',
        '',
        '',
        '梅林🧙‍♂️、派西维尔🛡️、莫甘娜😈、刺客🔪、1名亚瑟的忠臣🙌',
        '梅林🧙‍♂️、派西维尔🛡️、莫甘娜😈、刺客🔪、2名亚瑟的忠臣🙌',
        '梅林🧙‍♂️、派西维尔🛡️、莫甘娜😈、刺客🔪、奥伯伦👻、2名亚瑟的忠臣🙌',
        '梅林🧙‍♂️、派西维尔🛡️、莫德雷德👹、莫甘娜😈、刺客🔪、3名亚瑟的忠臣🙌（建议使用湖中仙女）',
        '梅林🧙‍♂️、派西维尔🛡️、莫德雷德👹、莫甘娜😈、刺客🔪、4名亚瑟的忠臣🙌（建议使用湖中仙女）',
        '梅林🧙‍♂️、派西维尔🛡️、莫德雷德👹、莫甘娜😈、刺客🔪、4名亚瑟的忠臣🙌、莫德雷德的爪牙💀（建议使用湖中仙女）'
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
    chineseRoleName: function () {
      let roleName = {
        'Merlin': '梅林🧙‍♂️',
        'Percival': '派西维尔🛡️',
        'Mordred': '莫德雷德👹',
        'Morgana': '莫甘娜😈',
        'Assassin': '刺客🔪',
        'Loyal Servant of Arther': '亚瑟的忠臣🙌',
        'Oberon': '奥伯伦👻',
        'Minion of Mordred': '莫德雷德的爪牙💀'
      }
      return roleName[this.userRole]
    },
    server () {
      return this.$store.state.server
    },
  },
  methods: {
    changeTeamUser () {
      this.preQuestDone = false;
    },
    toggleGrayscale (event) {
      event.target.classList.toggle('grayscale');
    },
    toggleDetails () {
      this.summaryText = '你的角色（' + (this.$refs.details.open ? '点击以隐藏' : '点击以展示') + '）'
    },
    getBackgroundStyle (message) {
      const { messagetitle, message2users } = message;
      const containsTeam = messagetitle.includes('Team') || messagetitle.includes('队伍');
      const startsWithZero = message2users[0] === '0';

      if (containsTeam) {
        // 如果包含“Team”或“队伍”，则不需要任何背景
        return {
          padding: '0 0 8px 0'
        };
      } else if (startsWithZero) {
        // 如果不包含“Team”且不包含“队伍”，并且 message2users 的第一个字符是0
        return {
          padding: '0 0 8px 0',
          background: 'linear-gradient(to left, rgba(0, 160, 224, 0.3), rgba(0, 0, 0, 0))'
        };
      } else {
        // 如果不包含“Team”且不包含“队伍”，并且 message2users 的第一个字符不是0
        return {
          padding: '0 0 8px 0',
          background: 'linear-gradient(to left, rgba(224, 118, 0, 0.3), rgba(0, 0, 0, 0))'
        };
      }
    },
    preDoQuestNew () {
      this.preQuestDone = true;
    },
    doQuestNew () {
      let re = {}
      re['teammembercount'] = this.selectedUsers.length
      for (let useri = 0; useri < re['teammembercount']; useri++) {
        re[`teammember${useri + 1}`] = this.selectedUsers[useri]
      }
      this.info = '提交任务队伍提名中...'
      axios({
        headers: {
          'X-CSRFToken': this.token,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        url: `${this.server}/newbuildteam/${this.roomId}/${this.userId}/${this.userPsw}/`,
        method: 'post',
        data: re,
      })
        .then((res) => {
          //new message pull
          this.updatemessages()

          //get all room info
          this.updateroominfoAndRender()
          this.info = ''
        })
    },
    chooseYes () {
      document.getElementById('confirmchoiceinfo').classList.remove('hidden')
      document.getElementById('confirmchoicebutton').classList.remove('hidden')
      this.userChoice = 'yes'
      this.userChoiceEmoji = '✔️'
    },
    chooseNo () {
      document.getElementById('confirmchoiceinfo').classList.remove('hidden')
      document.getElementById('confirmchoicebutton').classList.remove('hidden')
      this.userChoice = 'no'
      this.userChoiceEmoji = '❌'
    },
    confirmChoice () {
      this.info = '提交投票中...'
      axios({
        method: 'get',
        url: `${this.server}/vote/${this.roomId}/${this.userId}/${this.userPsw}/${this.userChoice}`
      })
        .then((response) => {
          document.getElementById('confirmchoiceinfo').classList.add('hidden')
          document.getElementById('confirmchoicebutton').classList.add('hidden')
          document.getElementById('votepart').classList.add('hidden')
          document.getElementById('teambuilding').classList.add('hidden')
          this.info = ''
        })
    },
    updatemessages () {
      axios({
        method: 'get',
        url: `${this.server}/allmessage/${this.roomId}/${this.userId}/${this.userPsw}/`,
      })
        .then((res) => {
          //console.log(res.data)
          let data = res.data
          let tempmessage = []
          let messagecount = data['messagecount']
          if (messagecount === this.messagecount) return
          // votepart.classList.add('hidden')
          this.messagecount = messagecount
          for (let messageid = 1; messageid <= messagecount; messageid++) {
            tempmessage.push({ 'messagetitle': data[`messagetitle${messageid}`], 'messageusers': data[`messageusers${messageid}`], 'message1users': data[`message1users${messageid}`], 'message2users': data[`message2users${messageid}`] })
          }
          //console.log(tempmessage)
          this.messages = tempmessage
        })

    },

    /*
    if (this.ongoingvote) {
            document.getElementById('teambuilding').classList.add('hidden')
            if (this.voted) {
                document.getElementById('votepart').classList.add('hidden')
            } else {
                document.getElementById('votepart').classList.remove('hidden')
            }
        } else {
            document.getElementById('teambuilding').classList.remove('hidden')
            document.getElementById('votepart').classList.add('hidden')
        }
    */

    updatecontainers () {
      if (this.showbuildcontainer) {
        document.getElementById('teambuilding').classList.remove('hidden')
      } else {
        document.getElementById('teambuilding').classList.add('hidden')
      }
      if (this.showvotecontainer) {
        document.getElementById('votepart').classList.remove('hidden')
      } else {
        document.getElementById('votepart').classList.add('hidden')
      }
    },

    updateroominfoAndRender () {
      axios({
        method: 'get',
        url: `${this.server}/allroominfo/${this.roomId}/${this.userId}/${this.userPsw}/`,
      })
        .then((res) => {
          let re = res.data
          //console.log(re)
          //normal
          if (re['roomfurtherstatus'] === 'normal') {
            this.showbuildcontainer = true
            this.showvotecontainer = false
            this.votetitle = ''
          }
          //build
          if (re['roomfurtherstatus'] === 'build') {
            this.showbuildcontainer = false
            this.selectedUsers = [this.userId]
            this.preQuestDone = false;
            if (this.votetitle != re['votetitle']) {
              this.votetitle = re['votetitle']
              this.votecontent = re['votecontent']
            }
            this.showvotecontainer = !re['voted']
          }
          //quest
          if (re['roomfurtherstatus'] === 'quest') {
            this.showbuildcontainer = false
            if (this.votetitle != re['votetitle']) {
              this.votetitle = re['votetitle']
              this.votecontent = re['votecontent']
            }
            this.showvotecontainer = re['onvote'] && (!re['voted'])
          }
          //deal with no button
          let ul = this.userRole
          if ((ul === 'Morgana' || ul === 'Assassin' || ul === 'Mordred' || ul === 'Oberon' || ul === 'Minion of Mordred') || re['roomfurtherstatus'] === 'build') {
            document.getElementById('nobutton').classList.remove('disabledButton')
          } else {
            document.getElementById('nobutton').classList.add('disabledButton')
          }
          this.updatecontainers()
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
    this.roomId = localStorage.getItem('roomId')
    this.userId = localStorage.getItem('userId')
    this.userPsw = localStorage.getItem('userPsw')
    this.selectedUsers = [this.userId]

    //get users info
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
      })

    //get user's role
    axios({
      method: 'get',
      url: `${this.server}/userrole/${this.roomId}/${this.userId}/${this.userPsw}/`,
    })
      .then((response) => {
        this.userRole = response.data
        let roleUserSees = {
          'Merlin': '你知道的坏人',
          'Percival': '一个是梅林🧙‍♂️，另一个是莫甘娜😈',
          'Mordred': '你的邪恶队友',
          'Morgana': '你的邪恶队友',
          'Assassin': '你的邪恶队友',
          'Loyal Servant of Arther': '', // 对于亚瑟的忠臣🙌，没有额外信息
          'Oberon': '你是奥伯伦👻，你不知道你的邪恶队友是谁', // 对于奥伯伦👻，没有额外信息
          'Minion of Mordred': '你的邪恶队友'
        }
        this.roleUserSee = roleUserSees[this.userRole]

      })


    //get users user see
    axios({
      method: 'get',
      url: `${this.server}/usersusersee/${this.roomId}/${this.userId}/${this.userPsw}/`,
    })
      .then((response) => {
        this.usersUserSee = []
        let reData = response.data
        for (let useri = 1; useri <= reData['userCount']; useri++) {
          this.usersUserSee.push({ 'userId': reData['user' + useri] })
        }
      })

    this.gettoken()

    this.updatemessages()
    this.updateroominfoAndRender()

    this.intervalId = setInterval(() => {
      //new message pull
      this.updatemessages()

      //get all room info
      this.updateroominfoAndRender()

    }, 2000)

    this.updatemessages()
    this.updateroominfoAndRender()
  },
  beforeUnmount () {
    // console.log(this.intervalId)
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },

}
</script>
<style>
.grayscale {
  filter: grayscale(100%);
  opacity: 0.2;
}
</style>



<style>
.checkbox-wrapper-60 input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-wrapper-60 *,
.checkbox-wrapper-60 ::after,
.checkbox-wrapper-60 ::before {
  box-sizing: border-box;
}

.checkbox-wrapper-60 {
  font-size: 1.5rem;
  line-height: 2rem;
  position: relative;
  display: flex;
  overflow: hidden;
  margin-bottom: 0.5rem;

  box-sizing: border-box;
}


.checkbox-wrapper-60 .check {
  width: 50px;
  height: 50px;
  position: absolute;
  opacity: 0;
}

.checkbox-wrapper-60 .label svg {
  vertical-align: middle;
}

.checkbox-wrapper-60 .path1 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: .3s all;
}

.checkbox-wrapper-60 .check:checked+label svg g path {
  stroke-dashoffset: 0;
}
</style>
