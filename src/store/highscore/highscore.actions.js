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
    const highScore = rootState.highscore.levels[level]
    if (!rootState.highscore.levels[level].id)
      await highScoreDb.create(highScore)
    else await highScoreDb.update(highScore)
  }
}
