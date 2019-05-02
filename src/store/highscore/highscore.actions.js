import HighScoreDB from '@/firebase/highscore-db'

export default {
  getHighscores: async ({ rootState, commit }) => {
    const highScoreDb = new HighScoreDB(rootState.authentication.user.id)
    const highScores = await highScoreDb.readAll()
    commit('setHighScores', highScores)
  },
  setHighScore: async ({ rootState, commit }, level, payload) => {
    const highScoreDb = new HighScoreDB(rootState.authentication.user.id)
    commit('setLevelHighScore', level, payload)
    const highScore = rootState.levels[level]
    await highScoreDb.update(highScore)
  }
}
