<template>
  <div class="page-wrapper">
    <div class="head-content">
      <div class="back-button">
        <a class="btn btn-text" @click.prevent="$router.push({ name: 'home' })">
          <font-awesome-icons
            :icon="['fas', 'chevron-left']"
          ></font-awesome-icons>
        </a>
      </div>
      <span class="header">leaderboard</span>
    </div>
    <div class="body">
      <div class="leaderboard-cards">
        <leaderboard-card
          v-for="level in allLevels"
          :key="level.level"
          :level="level"
        ></leaderboard-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LeaderboardCard from '@/components/LeaderboardCard'

export default {
  components: { LeaderboardCard },
  data: () => ({
    allLevels: []
  }),
  computed: {
    ...mapState('highscore', ['levels'])
  },
  mounted() {
    const lv = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'hard']
    for (const level of lv) {
      let lv = this.levels.find(h => h.level == level)
      if (!lv) {
        lv = {
          level,
          info: null
        }
      }
      this.allLevels.push(lv)
    }
  }
}
</script>

<style lang="sass" scoped>
.page-wrapper
  @apply flex flex-col justify-center items-center
  .head-content
    @apply fixed pin-t w-full bg-white h-16
    .back-button
      @apply absolute pin-l ml-3 mt-6 z-50
    .header
      @apply absolute pin m-auto text-lg font-bold uppercase text-center mt-6
  .body
    @apply w-full mt-10
</style>
