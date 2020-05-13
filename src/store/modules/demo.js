// 函数返回 可以用来重置
const initialState = () => {
  return {
    showModal: false
  }
}
const state = initialState()

const mutations = {
  RESET_STATE (state) { // 用函数来重置
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },
  CHANGE_SETTING: (state, { key, val }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = val
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
