<template>
  <div class="wrapper">
    <div
      :class="difficulty == 6 ? 'button-disabled' : 'button-enabled'"
      class="button"
      @click="up()"
    >
      <fa :icon="['fas', 'caret-left']" />
    </div>

    <fa
      class="face"
      :style="{
        color: `rgba(${difficulty > 3 ? difficulty * 25 : 0}, ${
          difficulty < 3
            ? difficulty === 2
              ? difficulty * 30
              : difficulty * 120
            : 0
        }, 0, 0.3)`,
      }"
      :key="emotion"
      :icon="['far', emotion]"
    />

    <div
      :class="difficulty == 1 ? 'button-disabled' : 'button-enabled'"
      class="button"
      @click="down()"
    >
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
        case 6:
          return 'dizzy'
      }
    },
  },
  methods: {
    up() {
      this.$emit(
        'update:difficulty',
        this.difficulty === 6 ? 6 : this.difficulty + 1
      )
    },
    down() {
      this.$emit(
        'update:difficulty',
        this.difficulty === 1 ? 1 : this.difficulty - 1
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
}

.button-enabled {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.button-enabled:hover {
  cursor: pointer;
  animation: hover 0.3s forwards;
}

.button-disabled {
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.button-enabled:active {
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

@media screen and (max-height: 800px) {
  .wrapper {
    width: 150px;
    margin: 20px;
  }
}
</style>
