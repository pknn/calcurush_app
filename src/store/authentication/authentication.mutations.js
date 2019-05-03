export default {
  setUser: (state, value) => (state.user = value),
  setDisplayName: (state, value) => (state.user.displayName = value),
  setDisplayNameToChange: (state, value) => (state.displayNameToChange = value)
}
