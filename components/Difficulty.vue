<template>
  <div class="wrapper">
    <div class="button" @click="up()"><fa :icon="['fas', 'caret-left']" /></div>

    <fa class="face" :key="emotion" :icon="['far', emotion]" />

    <div class="button" @click="down()">
      <fa :icon="['fas', 'caret-right']" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['difficulty'],
  computed: {
    emotion() {
      switch (this.difficulty) {
        case 1:
          return 'grin-beam'
        case 2:
          return 'grin'
        case 3:
          return 'smile'
        case 4:
          return 'frown'
        case 5:
          return 'sad-cry'
      }
    },
  },
  methods: {
    up() {
      this.$emit(
        'update:difficulty',
        this.difficulty === 5 ? 1 : this.difficulty + 1
      )
    },
    down() {
      this.$emit(
        'update:difficulty',
        this.difficulty === 1 ? 5 : this.difficulty - 1
      )
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
}
.face {
  font-size: 30px;
  color: rgba(70, 63, 36, 0.781);
}

.button {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  font-size: 1.5rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.button:hover {
  cursor: pointer;
  animation: hover 0.3s forwards;
}

.button:active {
  animation: unhover 0.1s forwards;
}

@keyframes hover {
  100% {
    transform: translate(-1px, -2px);
    box-shadow: 4px 5px 5px rgba(0, 0, 0, 0.1);
  }
}

@keyframes unhover {
  0% {
    transform: translate(-1px, -2px);
    box-shadow: 4px 5px 5px rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: translate(0);
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.1);
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s;
}
.slide-fade-enter, .slide-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(-40px);
}

.slide-fade-leave-to {
  transform: translateX(40px);
}
</style>
