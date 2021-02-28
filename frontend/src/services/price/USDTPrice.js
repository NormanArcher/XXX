import PriceService from './PriceService'

class USDTPrice extends PriceService {
  constructor(key, pool, vue) {
    super(key, pool, vue);
  }
  calcPrice(){
    return 1;
  }
}

export default USDTPrice
