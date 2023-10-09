import { IProducto } from "../interfaces";

const getPriceAdjustment = (userType: string) => {
    switch (userType) {
      case 'registrado':
        return 0.2;
      case 'premium':
        return 0.5;
      default:
        return 1;
    }
  };
  
  const getProductPrice = (product: IProducto, userType: string) => {
    const priceAdjustment = getPriceAdjustment(userType);
    if(product.precios){
        return Number(product.precios.precio_lista) * priceAdjustment;
    }else{
        return 0
    }
  };
  
  export default getProductPrice;
  