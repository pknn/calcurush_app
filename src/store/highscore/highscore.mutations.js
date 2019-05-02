export default {
  setLevelHighScore: (state, level, payload) => {
    state.levels[level].user = payload.user
    state.levels[level].score = payload.score
  },
  setHighScores: (state, payloads) => (state.levels = payloads)
}
