<template>
    <div>
        <div class="subtitle">Room ID</div>
        <input v-on:input="checkRoomId" v-model="roomId" type="text" placeholder="Room ID" />
        <br />
        <div class="subtitle">Room Password</div>
        <input v-on:input="checkRoomPsw" type="text" v-model="roomPsw" placeholder="Room Password" />
        <br />
        <button v-on:click="createRoom">Create Room</button>
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
            validRoomId: 'sample',
            roomPsw: 'sample',
            validRoomPsw: 'sample',
            info: '',
            server: 'http://127.0.0.1:8000',
        }
    },
    methods: {
        createRoom() {
            if (this.validRoomId === '' || this.validRoomPsw === '') {
                this.info = 'Room ID and Room Password cannot be empty!'
                return
            }
            this.info = ''
            //将validRoomId和validRoomPsw发送到后端
            //是否存在
            console.log(`${this.server}/create/${this.validRoomId}/${this.validRoomPsw}/`)
            axios({
                method: 'get',
                url: `${this.server}/create/${this.validRoomId}/${this.validRoomPsw}/`,
            })
                .then((response) => {
                    console.log(response)
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
        checkRoomPsw() {
            let flag = this.roomPsw.length <= 6;
            for (let i = 0; i < this.roomPsw.length && flag; i++) {
                let c = this.roomPsw.charAt(i)
                if (!(('0' <= c && c <= '9') || ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z'))) {
                    flag = false;
                }
            }
            if (flag) {
                this.validRoomPsw = this.roomPsw
                this.updateRoomInfo()
            } else {
                this.roomPsw = this.validRoomPsw
            }
        },
        updateRoomInfo() {
            localStorage.setItem(`roomId`, this.validRoomId)
            localStorage.setItem(`roomPsw`, this.validRoomPsw)
        }
    },
}
</script>