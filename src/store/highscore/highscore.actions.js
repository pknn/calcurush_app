import HighScoreDB from '@/firebase/highscore-db'

export default {
  getHighscores: async ({ rootState, commit }) => {
    const highScoreDb = new HighScoreDB(rootState.authentication.user.id)
    const highScores = await highScoreDb.readAll()
    commit('setHighScores', highScores)
  },
  setHighScore: async ({ rootState, commit }, payload) => {
    const highScoreDb = new HighScoreDB(rootState.authentication.user.id)

    const { level } = payload

    commit('setLevelHighScore', payload)
    const highscore = rootState.highscore.levels.find(h => h.level == level)
    if (!highscore.id) {
      await highScoreDb.create(highscore)
    } else await highScoreDb.update(highscore)
  }
}
