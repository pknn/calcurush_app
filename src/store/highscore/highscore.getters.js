export default {
  levelHighscore: state => level => state.levels[level],
  isNewHighScore: state => (level, score) => state.levels[level].score < score
}
