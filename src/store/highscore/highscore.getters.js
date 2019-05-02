export default {
  levelHighscore: state => level => state.levels[level],
  isNewHighScore: state => game => {
    const currentHighScore = state.levels[game.level].score
    console.log(currentHighScore)
    return state.levels[game.level].score < game.score
  }
}
