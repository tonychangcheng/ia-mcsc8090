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
        <button id="startGameButton" v-on:click="startGame" class="disabledButton">Start Game</button>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name: 'WaitingRoomView',
    data() {
        return {
            roomId: '',
            userId: '',
            userPsw: '',
            users: [],
            userCount: 0,
            server: 'http://127.0.0.1:8000',
        }
    },
    computed: {
        template: function () {
            if (this.userCount < 5) return 'Too less users'
            if (this.userCount > 10) return 'Too many users'
            let templates = ['', '', '', '', '', 'Merlin, Percival, Morgana, Assassin, 1 Loyal Servant of Arther', 'Merlin, Percival, Morgana, Assassin, 2 Loyal Servants of Arther', 'Merlin, Percival, Morgana, Assassin, Oberon, 2 Loyal Servants of Arther', 'Merlin, Percival, Mordred, Morgana, Assassin, 3 Loyal Servants of Arther (Lady of the Lake is recommended)', 'Merlin, Percival, Morgana, Assassin, Oberon, 2 Loyal Servants of Arther', 'Merlin, Percival, Mordred, Morgana, Assassin, 4 Loyal Servants of Arther (Lady of the Lake is recommended)', 'Merlin, Percival, Morgana, Assassin, Oberon, 2 Loyal Servants of Arther', 'Merlin, Percival, Mordred, Morgana, Assassin, 4 Loyal Servants of Arther, 1 Minion of Mordred (Lady of the Lake is recommended)']
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
        startGame() {

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
                })
        }, 1000)
    }
}
</script>