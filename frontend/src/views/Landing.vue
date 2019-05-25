<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <Chat />
      </div>
    </div>
  </div>
</template>

<script>
import Chat from '@/components/Chat'

export default {
  name: 'Landing',
  components: {
    Chat
  }
}
</script>

<style lang="css" scoped>
</style>
