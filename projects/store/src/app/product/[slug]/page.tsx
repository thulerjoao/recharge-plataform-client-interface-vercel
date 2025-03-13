import { fetchProducts } from "lib/api";
import ProductPage from "./index";
import { ProductType } from "types/globalTypes";
import { removeSpace } from "utils/removeSpace";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const products = await fetchProducts();
  const slug = params.slug;
  const product = products.find(
    (product: ProductType) => removeSpace(product.name) === slug,
  );
  return <ProductPage product={product} products={products} />;
};
export default Page;
