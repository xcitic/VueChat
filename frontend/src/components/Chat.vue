<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr/>
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p><span class="font-weight-bold">{{ msg.user }}</span> {{ msg.message }}</p>
        </div>
        <div class="isTyping" v-if="userIsTyping !== null">
          {{userIsTyping}} is typing...
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.preventDefault="sendMessage" >
        <div class="form-group">
          <label for="user">User:</label>
          <input type="text" v-model="user" class="form-control">
        </div>
        <div class="form-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" @input="imTyping" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'

const socket = io('localhost:3000')

export default {
  name: 'Chat',
  data () {
    return {
      message: '',
      user: '',
      userIsTyping: null,
      typingSent: false
    }
  },

  computed: {
    ...mapState({
      room: state => state.chat.room,
      messages: state => state.chat.messages
    })
  },

  mounted () {
    // join the right room
    socket.emit('join_room', this.room)
    // when a message is broadcasted update the messages array
    socket.on('receive_message', msg => {
      this.$store.commit('chat/updateMessages', msg)
    })
    // when another user is typing, display it
    socket.on('userIsTyping', user => {
      this.userIsTyping = user
    })
    // when the user stops typing, or deletes the content display it
    socket.on('userIsNotTyping', user => {
      this.userIsTyping = null
    })
  },

  methods: {
    sendMessage (e) {
      e.preventDefault()
      this.broadcast()
    },

    async broadcast () {
      socket.emit('send_message', {
        room: this.room,
        user: this.user,
        message: this.message
      })
      await this.clearMessage()
    },

    clearMessage () {
      this.message = ''
      this.imNotTyping()
    },

    imTyping () {
      if (this.message) {
        if (!this.typingSent) {
          socket.emit('typing', {
            room: this.room,
            user: this.user
          })
          this.typingSent = true
        }
      } else {
        this.imNotTyping()
      }
    },

    imNotTyping () {
      socket.emit('notTyping', {
        room: this.room,
        user: this.user
      })
      this.typingSent = false
    }
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
