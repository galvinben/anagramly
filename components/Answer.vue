<template>
  <input
    autocomplete="off"
    :id="word.id"
    v-model="word.result"
    class="answers-input"
    :style="style"
    :disabled="correct"
    :maxlength="word.answer.length"
  />
</template>

<script>
export default {
  props: ['word'],
  computed: {
    style() {
      return `width: ${this.word.width}px`
    },
    correct() {
      return this.word.result === this.word.answer
    },
  },
}
</script>

<style scoped>
.answers-input {
  letter-spacing: 4px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 2em;
  margin: 10px;
  height: 50px;
  border-radius: 5px;
  border: none;
  box-shadow: inset 2px 3px 2px rgba(0, 0, 0, 0.2),
    inset -1px -1px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  padding: 15px;
  box-sizing: border-box;
}
</style>
