export default {
  setLevelHighScore: (state, payload) => {
    const { level, info } = payload
    console.log(payload)
    if (!state.levels[level]) state.levels[level] = {}
    state.levels[level].user = info.user
    state.levels[level].score = info.score
  },
  setHighScores: (state, payloads) => (state.levels = payloads),
  setGame: (state, payload) => (state.game = payload)
}
