<template>
    <div>
        <div class="subtitle">Room ID</div>
        <input v-on:input="checkRoomId" v-model="roomId" type="text" placeholder="Room ID" />
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
            info: '',
            server: 'http://127.0.0.1:8000',
        }
    },
    methods: {
        createRoom() {
            if (this.validRoomId === '') {
                this.info = 'Room ID cannot be empty!'
                return
            }
            this.info = ''
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
                        this.$router.push({ path: '/joinroom' })
                    } else {
                        this.info = response.data
                    }
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
        updateRoomInfo() {
            localStorage.setItem(`roomId`, this.validRoomId)
        },
    },
    mounted: function () {
        if (!(localStorage.getItem('roomId') === null)) {
            let tempRoomId = localStorage.getItem('roomId');
            this.roomId = tempRoomId;
            this.validRoomId = tempRoomId;
        }
    },

}
</script>