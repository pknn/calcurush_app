export default {
  levelHighscore: state => level => state.levels.find(h => h.level == level),
  isNewHighScore: state => game => {
    const level = state.levels.find(h => h.level == game.level)
    if (!level) return true
    else return level.score < game.score
  }
}
