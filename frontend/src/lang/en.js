export default {
  common: {
    confirmTran: "Transaction is confirming ...",
    tranSuccess: "Success",
    copied: "Copied to clipboard",
    downloadFarmer: "Download Farmer"
  },
  error: {
    isNotAmount: "Please enter a valid number greater than 0",
    insufficientBalance: "Insufficient Balance",
    noRef: "Referrer is invalid",
  },
  route: {
    home: 'Home',
    fram: 'Farm',
    admin: 'Admin',
  },
  layout: {
    connect: 'Connect Wallet',
    conn: 'Connect',
    connected: 'Connected',
    tip: "Tootip",
    network: {
      unsupported: "Unsupported Network",
      "switch": "Switch to BSC network to use the app!"
    },
    metamask: {
      uninstall: "No installed the Metamask",
      install: "Please install the Metamask!",
      installed: "If you have installed the Metamask,",
      download: "Download",
      reload: "please reload the Metamask"
    },
  },
  fram: {
    countdown: {
      days: "days",
      day: "day",
      hours: "hours",
      hour: "hour",
      minutes: "minutes",
      minute: "minute",
      mins: "mins",
      min: "min",
      rules: "Mining rules",
      address: "Address inquiry",
      notstart: "Mining is not started",
      remaining: "Remaining time of mining",
      report: "The audit report",
      doc: "Document",
    },
    chart: {
      exchange: "Exchange",
      add: "Add liquidity",
      totalValue: "Total value locked TVL(USDT)",
      totalLiquidity: "Total supply({rewardCoin})",
      totalLiquidityValue: "Total value in USDT({rewardCoin})"
    },
    pool: {
      deposited: 'Deposited',
      fram: 'Stake',
      income: 'Expected annualization',
      connect: "Connect wallet",
      network: "Invalid network configuration",
      deposit: "pool {poolName}",
      stored: "Per Day",
      excavation: "stake {poolCoin} for {rewardCoin}",
      value: "本池锁仓价值TVL"
    },
    detail: {
      my: "My ",
      mymsg: {
        unlogon: "Not logged in",
        view: "View on HECOScan",
        copy: "Copy address",
      },
      common: {
        framed: "Earned",
        day: "Daily News",
        week: "Projected annual",
        get: "Havest",
        canGet: "Available rewards",
        canRansom: "Redeemable",
        allTip: "After full redemption, no income will be obtained",
        ransomNum: "Enter redemption quantity",
        getNum: "Get all rewards",
        desc: "Deposit {poolCoin} and earn {rewardCoin}",
      },
      auth: {
        authed: "Authorized",
        unauth: "Unauthorized",
        authBtn: "Authorization",
        desc: "Wallet authorization is the precondition of earning income",
      },
      deposited: {
        ransom: "Redeem available",
        depositBtn: "Deposit",
        ransomBtn: "Redeem",
        depositTitle: "Deposited {poolCoin}",
        ransomTitle: "Redemption of {poolCoin}",
        referrer: "Referrer(optional)",
        depositNum:"Enter the quantity deposited",
        canUse: "Available",
        desc: "Deposit token to obtain liquidity and earn {rewardCoin}, which lasts for 2 months. It will be closed automatically when it arrives. During the closing period, income can be withdrawn, but not deposited.",
        desc1: "Deposit {poolCoin} Earn {rewardCoin}",
        first: "Step one",
        second: "Step two",
        third: "Step three",
        fourth: "Step four"
      },
      liquidity: {
        available: "Earned",
        daily: "Daily News",
        annual: "Projected annual"
      },
      liquidityType: {
        desc: "Deposit a certain amount of {subCoin1} - {subCoin2} to provide liquidity for the trading pair and obtain {poolCoin} mining voucher",
        btn: "Add liquidity"
      }
    },
  },
  admin: {
    switchAdmin: "Transfer ownership",
    acceptAdmin: "Accept ownership",
    addPerson: "Add minter",
    createCoins: "Mint",
    switchPoolAdmin: "Transfer ownership",
    addPoolPerson: "Update rewards distribution address",
    createWater: "Provide reward",
    btnConfirm: "Confirm",
    btnAccept: "Accept",
    adminTip: "You are admin",
    inputAddress: "Input Address",
    inputNumber: "Input Number",
    pools: {
      poolManage: "Manage pool contract",
      poolAddress: "Select pool contract",
      rewardManage: "Manage token contract",
      rewardAddress: "Select token contract"
    },
    messages:{
      address: "Input Address",
    }
  },
}
