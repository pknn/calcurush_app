export default {
  setLevelHighScore: (state, payload) => {
    const { level, info } = payload
    const highscore = state.levels.find(h => h.level === level)
    if (!highscore)
      state.levels.push({
        level,
        info
      })
    else highscore.info = info
  },
  setHighScores: (state, payloads) => (state.levels = payloads),
  setGame: (state, payload) => (state.game = payload)
}
