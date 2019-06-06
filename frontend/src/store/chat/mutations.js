export default {
  setRoom (state, room) {
    state.room = room
    state.status = 'successfully set room'
  },

  updateMessages (state, msg) {
    state.messages = [...state.messages, msg]
  }
}
