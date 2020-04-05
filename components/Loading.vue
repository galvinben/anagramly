<template>
  <div class="loading">
    <div class="dot"><fa :icon="['far', 'frown']" /></div>
    <div class="dot"><fa :icon="['far', 'meh']" /></div>
    <div class="dot"><fa :icon="['far', 'smile']" /></div>

    <div class="shadows loading">
      <div class="dot-shadow" />
      <div class="dot-shadow" />
      <div class="dot-shadow" />
    </div>
  </div>
</template>

<style scoped>
.loading {
  position: absolute;
  width: 36px;
  height: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.dot {
  width: 10px;
  height: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 50%;
  animation: bounce ease 1s infinite;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.8);
}

@keyframes bounce {
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
}

.shadows {
  margin-left: -1px;
  width: 38px;
  position: absolute;
}

.dot-shadow {
  width: 11px;
  height: 4px;
  background: rgba(0, 0, 0, 0);
  border-radius: 50%;
  animation: bounce-shadow ease 1s infinite;
  box-shadow: 0 8px 2px -1px rgba(0, 0, 0, 0.5);
}

@keyframes bounce-shadow {
  25% {
    box-shadow: 0 18px 8px rgba(0, 0, 0, 0.5);
  }
  50% {
    box-shadow: 0 8px 2px -1px rgba(0, 0, 0, 0.5);
  }
}

.dot:nth-child(1),
.dot-shadow:nth-child(1) {
  animation-delay: 100ms;
}
.dot:nth-child(2),
.dot-shadow:nth-child(2) {
  animation-delay: 200ms;
}
.dot:nth-child(3),
.dot-shadow:nth-child(3) {
  animation-delay: 300ms;
}
</style>
