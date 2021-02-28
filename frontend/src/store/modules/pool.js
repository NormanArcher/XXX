const state = {
  options: {
    depositShow: false,
    ransomShow: false,
    getShow: false,
    myShow: false,

    getType: null,

    referrer: null, // 推荐人

    rewardBalanceOf: 0, // 奖励币余额
    tokenBalanceOf: 0, // 挖矿币可用余额
    balanceOf: 0, // 已存入staked
    earned: 0, // 流动性挖出
    earnedByWeight: 0, // 贡献者挖出

    rewardForDuration: 0, // 在某段时间内流动性挖出
    rewardsDuration: 0, // 产生收益的间隔时间
    weightForDuration: 0, // 在某段时间内贡献者挖出
    weight: 0, //

    auth: 0,
    data: {},
    actives: {
      liquidityType: false,
      auth: true,
      deposited: false,
      liquidity: false,
      contribution: false,
    },
  }
}

const mutations = {
  CHANGE_OPTIONS: (state, data) => {
    for(let key in data){
      if (state.options.hasOwnProperty(key)) {
        state.options[key] = data[key];
      }
    }
  },
  SET_OPTIONS: (state, options) => {
    state.options = options;
  },
  CACHE_OPTIONS: (state) => {
    localStorage.setItem("zzl-pool-detail", JSON.stringify(state.options));
  },
}

const actions = {
  changeOptions({ commit }, data) {
    commit('CHANGE_OPTIONS', data)
  },
  setOptions({ commit }, options){
    commit('SET_OPTIONS', options)
  },
  cacheOptions({ commit }){
    commit('CACHE_OPTIONS')
  },
  async initOptions({ commit }, poolData) {
    commit('CHANGE_OPTIONS', {
      data: poolData
    });
    commit('CACHE_OPTIONS');
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
