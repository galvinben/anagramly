<template>
  <div class="answer-wrap">
    <div class="definition" v-if="showDefinition">{{ word.definition }}</div>
    <div
      :style="style"
      class="answer-input"
      :class="complete ? 'input-complete' : ''"
      @click="showDefinition = complete ? !showDefinition : false"
    >
      <div v-for="(letter, i) in word.answer" :key="i">
        <input
          class="answer-letter"
          :class="complete ? 'letter-complete' : ''"
          maxlength="1"
          v-model="word.result[i]"
          :disabled="word.locks[i].locked || complete"
          @focus="onFocus"
          @blur="onBlur"
          @beforeinput="beforeInput"
          @input="onInput"
          @keyup="onKeyUp"
          @keydown="onKeyDown"
        />
        <div class="_" />
      </div>
    </div>
    <div class="locks">
      <div
        class="lock"
        v-for="(lock, i) in word.locks"
        :key="i"
        @click="lock.locked ? unlock(lock) : lockon(lock)"
      >
        <fa
          class="lock-hover unlock-icon"
          v-if="!lock.locked && !complete"
          :icon="['fas', 'unlock-alt']"
        />
        <fa
          :class="complete ? 'unlock-icon' : 'lock-hover lock-icon'"
          v-if="lock.locked || complete"
          :icon="['fas', 'lock']"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['word'],
  data: () => ({
    showDefinition: false,
  }),
  computed: {
    width() {
      return this.word.answer.length * (window.innerWidth > 700 ? 1.31 : 1.4)
    },
    style() {
      return `width: ${this.width}rem`
    },
    complete() {
      return (
        this.word.result.join('').toLowerCase() === this.word.answer.join('')
      )
    },
  },
  methods: {
    beforeInput(event) {
      if (
        event.inputType === 'deleteContentBackward' &&
        event.target.parentElement.previousElementSibling &&
        (event.target.value == '' || event.target.value == ' ')
      ) {
        this.$emit(
          'focusPreviousNotDisabled',
          event.target.parentElement.previousElementSibling.firstElementChild
        )
        return
      }
      if (event.inputType === 'insertText' && event.target.value.length) {
        event.target.value = ''
      }
      return
    },
    onInput(event) {
      if (
        event.inputType === 'insertText' &&
        event.target.parentElement.nextElementSibling
      ) {
        this.$emit(
          'focusNextNotDisabled',
          event.target.parentElement.nextElementSibling.firstElementChild
        )
      }
      return
    },
    onKeyUp(event) {
      if (event.key === 'ArrowLeft') {
        if (event.target.parentElement.previousElementSibling) {
          this.$emit(
            'focusPreviousNotDisabled',
            event.target.parentElement.previousElementSibling.firstElementChild
          )
        }
        return
      }
      if (event.key === 'ArrowRight') {
        if (event.target.parentElement.nextElementSibling) {
          this.$emit(
            'focusNextNotDisabled',
            event.target.parentElement.nextElementSibling.firstElementChild
          )
        }
        return
      }
    },
    onKeyDown(event) {
      event.target.selectionStart = event.target.selectionEnd =
        event.target.value.length
    },
    onFocus(event) {
      event.target.nextElementSibling.style.background = 'rgba(0, 0, 0, 0.7)'
    },
    onBlur(event) {
      event.target.nextElementSibling.style.background = 'rgba(0, 0, 0, 0.3)'
    },
    lockon(lock) {
      if (!this.complete) {
        this.$ga.event({
          eventCategory: 'game',
          eventAction: 'lock',
        })
        lock.locked = true
      }
    },
    unlock(lock) {
      if (!this.complete) {
        this.$ga.event({
          eventCategory: 'game',
          eventAction: 'unlock',
        })
        lock.locked = false
      }
    },
  },
  watch: {
    complete: function (newVal) {
      if (newVal === true) this.word.win = true
    },
  },
}
</script>

<style scoped>
.answer-wrap {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.answer-input {
  margin: 10px;
  height: 4rem;
  border-radius: 5px;
  box-shadow: inset 2px 3px 2px rgba(0, 0, 0, 0.2),
    inset -1px -1px 4px rgba(0, 0, 0, 0.1);
  padding: 0 15px;
  box-sizing: content-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.answer-letter {
  height: 3rem;
  width: 1.4rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 2rem;
  overflow: hidden;
  outline: none;
  border: none;
  caret-color: transparent;
  background: rgba(0, 0, 0, 0);
}

.answer-letter:disabled {
  color: rgba(0, 0, 0, 0.3);
}

._ {
  height: 2px;
  border-radius: 1px;
  width: 1.2rem;
  background: rgba(0, 0, 0, 0.3);
}

.locks {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.lock {
  width: 1.4rem;
}

.lock-icon {
  color: rgba(0, 0, 0, 0.2);
}

.unlock-icon {
  color: rgba(0, 0, 0, 0.1);
}

.lock-hover:hover {
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.input-complete:hover,
.letter-complete:hover {
  cursor: pointer;
}

.input-complete:hover {
  background: rgba(0, 0, 0, 0.05);
}

.definition {
  position: absolute;
  width: 12em;
  background: rgba(238, 238, 238, 0.9);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  margin-top: 65px;
  margin-left: -3em;
  animation: fade 1s both;
  opacity: 0;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

@keyframes fade {
  100% {
    opacity: 1;
  }
}
</style>
