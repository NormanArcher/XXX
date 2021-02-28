import request from '@/utils/request'

export const getSettings = (vue) => {
  return request({
      url:`/data/settings.json`,
      method:'get'
  });
}

export const getPools = (vue) => {
  return request({
      url:`/data/pools.json?t=${new Date().getTime()}`,
      method:'get'
  });
}

export const getPrices = (vue) => {
  return request({
      url:`/data/price.json?t=${new Date().getTime()}`,
      method:'get'
  });
}
