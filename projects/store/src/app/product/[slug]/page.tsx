import { fetchProducts } from "lib/api";
import ProductPage from "./index";

import { ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const products = await fetchProducts();
  const slug = params.slug;
  const product = products.find(
    (product: ProductType) => formatString(product.name) === slug,
  );
  return <ProductPage product={product} />;
};
export default Page;
