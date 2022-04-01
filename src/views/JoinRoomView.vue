<template>
    <div>
        <div class="subtitle">Room ID</div>
        <input v-on:input="checkRoomId" v-model="roomId" type="text" placeholder="Room ID" />
        <br />
        <div class="subtitle">User ID</div>
        <input v-on:input="checkUserId" v-model="userId" type="text" placeholder="User ID" />
        <br />
        <div class="subtitle">User Password</div>
        <div class="subtitle">DO NOT USE YOUR COMMON PASSWORD</div>
        <input v-on:input="checkUserPsw" v-model="userPsw" type="text" placeholder="User Password" />
        <br />
        <button v-on:click="joinRoom">Join Room</button>
        <br />
        <div>{{ info }}</div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name: 'CreateRoomView',
    data() {
        return {
            roomId: 'sample',
            userId: 'sample',
            userPsw: 'sample',
            validRoomId: 'sample',
            validUserId: 'sample',
            validUserPsw: 'sample',
            info: '',
            server: 'http://127.0.0.1:8000',
        }
    },
    methods: {
        joinRoom() {
            if (this.validRoomId === '') {
                this.info = 'Room ID cannot be empty!'
                return
            }
            if (this.validUserId === '') {
                this.info = 'User ID cannot be empty!'
                return
            }
            if (this.validUserPsw === '')
                this.info = 'Password cannot be empty!'
            //将validRoomId和validRoomPsw发送到后端
            //是否存在
            //console.log(`${this.server}/create/${this.validRoomId}/${this.validRoomPsw}/`)
            axios({
                method: 'get',
                url: `${this.server}/join/${this.validRoomId}/${this.validUserId}/${this.validUserPsw}/`,
            })
                .then((response) => {
                    let tReData = response.data
                    if (tReData === 'createdUser') {
                        this.info = 'Successfully Create User'
                        return
                    }
                    if (tReData === 'userExistAndValid') {
                        this.info = 'Successfully Login'
                        return
                    }
                    this.info = tReData
                })
        },
        checkRoomId() {
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
        checkUserId() {
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
        checkUserPsw() {
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
        updateRoomInfo() {
            localStorage.setItem(`roomId`, this.validRoomId)
            localStorage.setItem(`userId`, this.validUserId)
            localStorage.setItem(`userPsw`, this.validUserPsw)
        }
    },
    mounted: function () {
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