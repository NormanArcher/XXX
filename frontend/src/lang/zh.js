export default {
  common: {
    confirmTran: "交易正在确认...",
    tranSuccess: "交易成功",
    copied: "已复制到剪切板",
    downloadFarmer: "下载Farmer"
  },
  error: {
    isNotAmount: "请输入一个大于0合法的金额",
    insufficientBalance: "余额不足",
    noRef: "推荐人不能为空",
  },
  route: {
    home: '主页',
    fram: '挖矿',
    admin: '管理员',
  },
  layout: {
    connect: '连接钱包',
    conn: '连接',
    connected: '已连接',
    tip: "提示",
    network: {
      unsupported: "不支持的网络",
      "switch": "请切换到主网后再使用!"
    },
    metamask: {
      uninstall: "浏览器没有安装Metamask插件",
      install: "请使用谷歌浏览器安装Metamask插件!",
      installed: "如果你已经安装过Metamask,",
      download: "下载",
      reload: "请刷新浏览器"
    },
  },
  fram: {
    countdown: {
      days: "天",
      day: "天",
      hours: "小时",
      hour: "小时",
      minutes: "分钟",
      minute: "分钟",
      mins: "分钟",
      min: "分钟",
      rules: "挖矿教程",
      address: "合约地址",
      notstart: "挖矿未开始",
      remaining: "挖矿剩余时间",
      report: "审计报告",
      doc: "官方挖矿文档",
    },
    chart: {
      exchange: "兑换",
      add: "添加流动性",
      totalValue: "总锁定价值TVL(USDT)",
      totalLiquidity: "当前{rewardCoin}总流通量",
      totalLiquidityValue: "当前{rewardCoin}流通市值(in USDT)"
    },
    pool: {
      deposited: '已存入',
      fram: '挖矿',
      income: '预计年化收益',
      connect: "请先连接钱包",
      network: "网络不正确",
      deposit: "{poolName}号池",
      stored: "每日产量",
      excavation: "存{poolCoin}挖{rewardCoin}",
      value: "本池锁仓价值TVL"
    },
    detail: {
      my: "我的",
      mymsg: {
        unlogon: "钱包未登录",
        view: "View on HECOScan",
        copy: "复制地址",
      },
      common: {
        framed: "已挖出",
        day: "每日获得",
        week: "预计年化收益",
        get: "领取",
        canGet: "可领取",
        canRansom: "可赎回",
        allTip: "全部赎回后将不再获取收益",
        ransomNum: "输入赎回数量",
        getNum: "输入领取数量",
        desc: "存入{poolCoin}代币赚取{rewardCoin}",
      },
      auth: {
        authed: "已授权",
        unauth: "未授权",
        authBtn: "授权",
        desc: "钱包授权是获得存入赚取收益的前置条件",
      },
      deposited: {
        ransom: "赎回可得",
        depositBtn: "存入",
        ransomBtn: "赎回",
        depositTitle: "存入{poolCoin}",
        ransomTitle: "赎回{poolCoin}",
        referrer: "输入推荐人地址(选填)",
        depositNum:"输入存入数量",
        canUse: "可用",
        desc: "存入代币获取流动性赚取{rewardCoin},为期2个月到时将自动关闭,关闭期间可提取收益,但不可存入.",
        desc1: "存入{poolCoin}即开始挖{rewardCoin}",
        first: "第一步",
        second: "第二步",
        third: "第三步",
        fourth: "第四步"
      },
      liquidity: {
        available: "已挖出",
        daily: "Daily News",
        annual: "Projected annual",
      },
      liquidityType: {
        desc: "存入一定量的{subCoin1}-{subCoin2}为该交易对提供流动性,获得{poolCoin}挖矿凭证",
        btn: "提供流动性"
      }
    },
  },
  admin: {
    switchAdmin: "币合约管理员转移",
    acceptAdmin: "币合约接受管理员",
    addPerson: "币合约增加铸币人",
    createCoins: "币合约铸币",
    switchPoolAdmin: "池合约管理员转移",
    addPoolPerson: "池合约更换注水人",
    createWater: "池合约注水",
    btnConfirm: "确认",
    btnAccept: "接受",
    adminTip: "你已成为管理员",
    inputAddress: "输入地址",
    inputNumber: "输入数量",
    pools: {
      poolManage: "池合约管理",
      poolAddress: "请选择池合约",
      rewardManage: "币合约管理",
      rewardAddress: "请选择矿币合约"
    },
    messages:{
      address: "请输入地址",
    }
  }
}
