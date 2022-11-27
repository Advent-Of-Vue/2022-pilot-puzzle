export const hasWinner = board => {
  const winningIndexCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const isWinningCombo = combo => {
    const playerSymbols = combo.map(index => board[index])

    return playerSymbols.every(
      symbol => symbol !== null && symbol === playerSymbols[0]
    )
  }

  return winningIndexCombos.map(isWinningCombo).some(winner => winner === true)
}
