<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <div v-if="!start && !website" class="card">
        <div class="line" />
        <div class="title">anagramly</div>
        <div class="line" />
        <div class="levels">
          <div class="level">
            Word Length:
            <Difficulty :difficulty.sync="wordLength" />
          </div>
          <div class="level">
            Word Count:
            <Difficulty :difficulty.sync="wordCount" />
          </div>
        </div>
        <div class="button" @click="begin()">Start</div>
      </div>
      <Anagram
        v-if="start && !website"
        :wordCount="wordCount"
        @reset="reset"
        :wordLength="wordLength"
      />
      <Website v-if="website" />
    </transition>
    <div v-if="!website" class="website-link">
      Made by
      <a class="website-href" @click="website=true">Ben Galvin</a>
    </div>
  </div>
</template>

<script>
import Anagram from '@/components/Anagram'
import Difficulty from '@/components/Difficulty'
import Website from '@/components/Website'
export default {
  components: {
    Anagram,
    Difficulty,
    Website
  },
  data: () => ({
    start: false,
    wordCount: 3,
    wordLength: 3,
    website: false
  }),
  methods: {
    reset() {
      this.start = false
    },
    begin() {
      this.$ga.event({
        eventCategory: 'wordCount',
        eventAction: this.wordCount,
      })
      this.$ga.event({
        eventCategory: 'wordLength',
        eventAction: this.wordLength,
      })
      this.start = true
    },
  },
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.3);
  padding: 25px;
  height: auto;
  width: 500px;
}

.title {
  font-family: "Cormorant", serif;
  font-size: 6rem;
  margin-top: -1.6rem;
  color: rgba(0, 0, 0, 0.5);
}

.line {
  height: 1px;
  width: 80%;
  background: rgba(0, 0, 0, 0.1);
  margin: 2rem;
}

.button {
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  font-size: 1.5rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

.button:hover {
  cursor: pointer;
  animation: hover 0.3s forwards;
}

.button:active {
  animation: unhover 0.1s forwards;
}

.level {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
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
  transition: all 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(-1000px);
}

.slide-fade-leave-to {
  transform: translateX(1000px);
}

.website-link {
  position: absolute;
  bottom: 3px;
  right: 10vw;
}

.website-href:hover {
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .card {
    width: 80vw;
  }

  .slide-fade-enter {
    transform: translateX(-600px);
  }

  .slide-fade-leave-to {
    transform: translateX(600px);
  }
}

@media screen and (max-height: 800px) {
  .card {
    height: 70vh;
  }

  .levels {
    display: flex;
  }

  .level {
    flex-direction: column;
  }
}
</style>
