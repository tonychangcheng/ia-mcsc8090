<template>
    <div>
        <div class="subtitle">Room ID</div>
        <div>{{ roomId }}</div>
        <div class="subtitle">Your User ID</div>
        <div>{{ userId }}</div>
        <div class="subtitle">Number of User(s)</div>
        <div>{{ userCount }}</div>
        <div class="subtitle">Users in the Room</div>
        <div v-for="user in users">{{ user.userId }}</div>
        <div class="subtitle">Tamplate</div>
        <div>{{ template }}</div>
        <div class="subtitle">Team Building Phase</div>
        <div>{{ teamBuildingPhase }}</div>
        <div class="subtitle">Your Role</div>
        <div>{{ userRole }}</div>
        <div class="subtitle">{{ roleUserSee }}</div>
        <div v-for="user in usersUserSee">{{ user.userId }}</div>
        <div class="subtitle">Quest</div>
        <div v-for="user in users">
            <label>
                <input
                    type="checkbox"
                    :id="user.userId"
                    :value="user.userId"
                    v-model="selectedUsers"
                />
                {{ user.userId }}
            </label>
        </div>
        <button v-on:click="doQuest">Do Quest</button>
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
            server: 'http://127.0.0.1:8000',
            usersUserSee: [],
            selectedUsers: [],
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
        }
    },
    methods: {
        doQuest() {

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
                let reData = response.data
                for (let useri = 1; useri <= reData['userCount']; useri++) {
                    this.usersUserSee.push({ 'userId': reData['user' + useri] })
                }
            })
    }
}
</script>
<style>
label {
    width: 100%;
}
</style>