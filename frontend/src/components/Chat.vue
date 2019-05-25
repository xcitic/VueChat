<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat</h3>
        <hr/>
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p><span class="font-weight-bold">{{ msg.user }}</span> {{ msg.message }}</p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="form-group">
          <label for="user">User:</label>
          <input type="text" v-model="user" class="form-control">
        </div>
        <div class="form-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Chat',
  data () {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io('localhost:3000')
    }
  },

  mounted () {
    this.socket.on('MESSAGE', data => {
      this.messages = [...this.messages, data]
    })
  },

  methods: {
    sendMessage (e) {
      e.preventDefault()

      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      })
        .then(this.message = '')
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
