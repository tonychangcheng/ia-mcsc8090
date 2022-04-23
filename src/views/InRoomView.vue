<template>
    <div>
        <div class="container">
            <div class="subtitle">Match Info</div>
            <div class>Room ID: {{ roomId }}</div>
            <div class>Your User ID: {{ userId }}</div>
            <div class>Number of User(s): {{ userCount }}</div>
            <!--
        <div class="subtitle">User(s) in the Room</div>
        <div v-for="user in users">{{ user.userId }}</div>
            -->
            <div class="subtitle">Template</div>
            <div>{{ template }}</div>
            <div class="subtitle">Number of Quest Team Members</div>
            <div>{{ teamBuildingPhase }}</div>
        </div>

        <div class="container">
            <div class="subtitle">Your Role</div>
            <div>{{ userRole }}</div>
            <div class="subtitle">{{ roleUserSee }}</div>
            <div v-for="user in usersUserSee">{{ user.userId }}</div>
        </div>

        <div class="container">
            <div class="subtitle">History</div>
            <div v-for="message in messages">
                <br />
                <div class="subsubtitle">{{ message.messagetitle }}</div>
                <div>{{ message.messageusers }}</div>
                <div class="green">{{ message.message1users }}</div>
                <div class="red">{{ message.message2users }}</div>
            </div>
        </div>

        <div id="votepart" class="hidden container">
            <div class="subtitle">{{ votetitle }}</div>
            <div>{{ votecontent }}</div>
            <button v-on:click="chooseYes">Yes</button>
            <button id="nobutton" class="disabledButton" v-on:click="chooseNo">No</button>
            <div id="confirmchoiceinfo" class="hidden">You chose "{{ userChoice }}"</div>
            <button id="confirmchoicebutton" class="hidden" v-on:click="confirmChoice">Confirm</button>
        </div>

        <div class="container" id="teambuilding">
            <div class="subtitle">Quest Team Building</div>
            <div v-for="user in users">
                <br />
                <label>
                    <input type="checkbox" :id="user.userId" :value="user.userId" v-model="selectedUsers" />
                    {{ user.userId }}
                </label>
            </div>
            <br />
            <button v-on:click="doQuest">Do Quest</button>
        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name: 'InRoomView',
    data() {
        return {
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
            ongoingvote: false,
            voted: false,
            votetitle: 'this is vote title',
            votecontent: 'this is vote content',
            userChoice: 'Yes',
        }
    },
    computed: {
        template: function () {
            if (this.userCount < 5) return 'Too less users'
            if (this.userCount > 10) return 'Too many users'
            let templates = ['', '', '', '', '', 'Merlin, Percival, Morgana, Assassin, 1 Loyal Servant of Arther', 'Merlin, Percival, Morgana, Assassin, 2 Loyal Servants of Arther', 'Merlin, Percival, Morgana, Assassin, Oberon, 2 Loyal Servants of Arther', 'Merlin, Percival, Mordred, Morgana, Assassin, 3 Loyal Servants of Arther (Lady of the Lake is recommended)', 'Merlin, Percival, Mordred, Morgana, Assassin, 4 Loyal Servants of Arther  (Lady of the Lake is recommended)', 'Merlin, Percival, Mordred, Morgana, Assassin, 4 Loyal Servants of Arther, Minion of Mordred (Lady of the Lake is recommended)']
            //                                    5                                                                 6                                                                  7                                                                            8                                                                                                                       9                                                                                                     10 
            return templates[this.userCount]
        },
        teamBuildingPhase: function () {
            if (this.userCount < 5) return 'Too less users'
            if (this.userCount > 10) return 'Too many users'
            let teamBuildingPhases = ['', '', '', '', '', '2 3 2 3 3', '2 3 4 3 4', '2 3 3 4(Protected Quest) 4', '3 4 4 5(Protected Quest) 5', '3 4 4 5(Protected Quest) 5', '3 4 4 5(Protected Quest) 5']
            return teamBuildingPhases[this.userCount]
        },
        server() {
            return this.$store.state.server
        },
    },
    methods: {
        doQuest() {

            //console.log(this.selectedUsers.length)
            let selectedUsersJSON = ''
            let request = {}
            for (let useri = 0; useri < this.selectedUsers.length; useri++) {
                request['user' + useri] = this.selectedUsers[useri]
            }
            selectedUsersJSON = JSON.stringify(request)

            axios({
                method: 'get',
                url: `${this.server}/buildteam/${this.roomId}/${this.userId}/${this.userPsw}/${this.selectedUsers.length}/`,
            })
                .then((response) => {
                    if (response.data === 'Start Build Team') {
                        let t = new Date().getTime()
                        for (let user of this.selectedUsers) {
                            //console.log(user)
                            t += 50
                            while (new Date().getTime() < t) { }
                            axios({
                                method: 'get',
                                url: `${this.server}/addteammember/${this.roomId}/${this.userId}/${this.userPsw}/${user}/`
                            })
                                .then((response) => {
                                    //console.log(response.data)
                                    //console.log(response.data === this.selectedUsers.length)
                                })
                        }
                    }
                })
        },
        chooseYes() {
            let confirmchoiceinfo = document.getElementById('confirmchoiceinfo')
            let confirmchoicebutton = document.getElementById('confirmchoicebutton')
            confirmchoicebutton.classList.remove('hidden')
            confirmchoiceinfo.classList.remove('hidden')
            this.userChoice = 'yes'
        },
        chooseNo() {
            let confirmchoiceinfo = document.getElementById('confirmchoiceinfo')
            let confirmchoicebutton = document.getElementById('confirmchoicebutton')
            confirmchoicebutton.classList.remove('hidden')
            confirmchoiceinfo.classList.remove('hidden')
            this.userChoice = 'no'
        },
        confirmChoice() {
            let confirmchoiceinfo = document.getElementById('confirmchoiceinfo')
            let confirmchoicebutton = document.getElementById('confirmchoicebutton')
            confirmchoicebutton.classList.add('hidden')
            confirmchoiceinfo.classList.add('hidden')
            axios({
                method: 'get',
                url: `${this.server}/vote/${this.roomId}/${this.userId}/${this.userPsw}/${this.userChoice}`
            })
                .then((response) => {

                })
            this.voted = true
        }
    },
    mounted: function () {
        this.roomId = localStorage.getItem('roomId')
        this.userId = localStorage.getItem('userId')
        this.userPsw = localStorage.getItem('userPsw')
        for (let i = 1; i <= 99999; i++)window.clearInterval(i)

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
                let roleUserSees = { 'Merlin': 'The Evils You Know', 'Percival': 'One is Merlin, the Other is Morgana', 'Mordred': 'The Evils You Know', 'Morgana': 'The Evils You Know', 'Assassin': 'The Evils You Know', 'Loyal Servant of Arther': '', 'Oberon': '', 'Minion of Mordred': '' }
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


        setInterval(() => {
            //get message pull
            axios({
                method: 'get',
                url: `${this.server}/messagecount/${this.roomId}/`,
            })
                .then((response) => {
                    //console.log(response.data)
                    if (this.messagecount === response.data) return
                    votepart.classList.add('hidden')

                    this.messagecount = response.data
                    let tempmessage = []
                    let t = new Date().getTime()
                    for (let messagei = 1; messagei <= response.data; messagei++) {
                        t += 50
                        while (new Date().getTime() < t) { }
                        axios({
                            method: 'get',
                            url: `${this.server}/message/${this.roomId}/${this.userId}/${this.userPsw}/${messagei}/`
                        })
                            .then((response) => {
                                //console.log(response.data)
                                tempmessage.push(response.data)
                            })
                        this.messages = tempmessage
                    }
                })

            //get build vote pull
            axios({
                method: 'get',
                url: `${this.server}/anybuild/${this.roomId}/${this.userId}/${this.userPsw}/`,
            })
                .then((response) => {
                    console.log('build:' + response.data)
                    if (response.data === 'True') {
                        this.votetitle = 'Team Building Proposal'
                        axios({
                            method: 'get',
                            url: `${this.server}/votecontent/${this.roomId}/${this.userId}/${this.userPsw}/`
                        })
                            .then((response) => {
                                if (response.data != this.votecontent) this.votecontent = response.data

                                //console.log(response.data)
                            })
                        this.ongoingvote = true
                    } else {
                        //get quest vote pull
                        axios({
                            method: 'get',
                            url: `${this.server}/anyquest/${this.roomId}/${this.userId}/${this.userPsw}/`,
                        })
                            .then((response) => {
                                console.log('quest:' + response.data)
                                if (response.data === 'True') {
                                    this.votetitle = 'Quest Proposal'
                                    axios({
                                        method: 'get',
                                        url: `${this.server}/votecontent/${this.roomId}/${this.userId}/${this.userPsw}/`
                                    })
                                        .then((response) => {
                                            if (response.data != this.votecontent) this.votecontent = response.data

                                            //console.log(response.data)
                                        })
                                    this.ongoingvote = true
                                } else {//no vote
                                    this.ongoingvote = false
                                }
                            })
                    }
                })
            //voted?
            axios({
                method: 'get',
                url: `${this.server}/voted/${this.roomId}/${this.userId}/${this.userPsw}/`,
            })
                .then((response) => {
                    this.voted = response.data === 'True'
                    console.log(this.voted)
                })

            //disable no button
            let ul = this.userRole
            if ((ul === 'Morgana' || ul === 'Assassin' || ul === 'Mordred' || ul === 'Oberon' || ul === 'Minion of Mordred') || this.votetitle === 'Team Building Proposal') {
                document.getElementById('nobutton').classList.remove('disabledButton')
            } else {
                document.getElementById('nobutton').classList.add('disabledButton')
            }

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


        }, 1000)
    }
}
</script>
<style>
label {
    width: 100%;
}
</style>