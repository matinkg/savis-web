export const extractKeys = (products: any) => {
  return (
    products?.map((product: any) => ({
      sku: product?.sku,
      price: product?.price,
      stock: product?.stock,
      product_status: product?.product_status,
      color: product?.color,
      size: product?.size,
    })) || []
  );
};
