<script setup>
import { ref, computed } from 'vue'
import { hasWinner } from './utils/hasWinner'

const board = ref(Array(9).fill(null))
const previousPlayer = ref(null)

// 0 - circle
// 1 - cross
const currentPlayer = ref(Math.round(Math.random()))

const someoneHasWon = computed(() => hasWinner(board.value))
const isDraw = computed(
  () => !someoneHasWon.value && board.value.every(cell => cell !== null)
)
const isGameOver = computed(() => someoneHasWon.value || isDraw.value)

// &#9711; - circle
// &#10005; - cross
const getPlayerHtmlEntity = playerId =>
  playerId !== null ? ['&#9711;', '&#10005;'][playerId] : ''

const getStatusMessage = () =>
  someoneHasWon.value
    ? `${getPlayerHtmlEntity(previousPlayer.value)} has won!`
    : isDraw.value
    ? "It's a draw!"
    : `It's ${getPlayerHtmlEntity(currentPlayer.value)}'s turn.`

const markCell = index => {
  if (isGameOver.value || board.value[index] !== null) return

  board.value[index] = currentPlayer.value
  previousPlayer.value = currentPlayer.value
  currentPlayer.value = Math.abs(currentPlayer.value - 1)
}

const resetGame = () => {
  previousPlayer.value = null
  currentPlayer.value = Math.round(Math.random())
  board.value = Array(9).fill(null)
}
</script>

<template>
  <div
    class="w-full h-full text-center flex flex-col justify-center items-center"
  >
    <div class="grid auto-cols-[1fr] auto-rows-[1fr] overflow-hidden">
      <div
        v-for="n in 9"
        :key="n"
        class="
          w-24
          h-24
          text-3xl
          md:w-32 md:h-32 md:text-4xl
          lg:w-36 lg:h-36
          flex
          justify-center
          items-center
          outline outline-1 outline outline-black
          last-of-type:row-start-3 last-of-type:col-start-3
        "
        v-html="getPlayerHtmlEntity(board[n - 1])"
        @click="markCell(n - 1)"
      ></div>
    </div>
    <p class="mt-5 mb-4 text-xl text-center" v-html="getStatusMessage()"></p>
    <button
      v-if="isGameOver"
      class="p-2 bg-green hover:bg-gray-dark hover:text-green rounded-md"
      @click="resetGame()"
    >
      Play again
    </button>
  </div>
</template>
