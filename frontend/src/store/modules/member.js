
const state = {
  member: {
    account: null,
    isMember: false,
    loading: false,
    price: "0",
    totalSupply: "0",
  }
}

const mutations = {
  SET_MEMBER: (state, member) => {
    state.member = member;
  },
  SET_ACCOUNT: (state, account) => {
    state.member.account = account;
  },
  SET_STATUS: (state, isMember) => {
    state.member.isMember = isMember;
  },
  SET_LOADING: (state, loading) => {
    state.member.loading = loading;
  },
  CHANGE_MEMBER: (state, { key, value }) => {
    if (state.member.hasOwnProperty(key)) {
      state.member[key] = value
    }
  }
}

const actions = {
  setMember({ commit }, member) {
    commit('SET_MEMBER', member)
  },
  setAccount({ commit }, account) {
    commit('SET_ACCOUNT', account)
  },
  setStatus({ commit }, isMember) {
    commit('SET_STATUS', isMember)
  },
  setLoading({ commit }, loading) {
    commit('SET_LOADING', loading)
  },
  changeMember({ commit }, data) {
    commit('CHANGE_MEMBER', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
