<template>
  <div class="actions">
    <div
      class="actions-button"
      :class="loading ? 'actions-disabled' : 'actions-enabled'"
      @click="scramble()"
    >
      <fa :icon="['fas', 'retweet']" />
    </div>
    <div
      class="actions-button"
      :class="loading ? 'actions-disabled' : 'actions-enabled'"
      @click="clear()"
    >
      <fa :icon="['fas', 'fire']" />
    </div>
    <div class="actions-button actions-disabled">
      <fa :icon="['fas', 'star']" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading'],
  methods: {
    scramble() {
      this.$emit('scramble')
    },
    clear() {
      this.$emit('clear')
    },
    win() {
      this.$emit('win')
    },
  },
}
</script>

<style scoped>
.actions {
  display: flex;
  width: 80%;
  flex-direction: row;
  justify-content: space-evenly;
}

.actions-button {
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}

.actions-enabled {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.actions-enabled:hover {
  cursor: pointer;
  animation: hover 0.3s forwards;
}

.actions-enabled:active {
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

.actions-disabled {
  color: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 800px) {
  .actions {
    width: 100%;
  }
  .actions-button {
    width: 30%;
  }
}
</style>
