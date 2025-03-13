import { fetchProducts } from "lib/api";

import { removeSpace } from "utils/removeSpace";
import PaymentPage from "./index";
import { PackageType, ProductType } from "types/productTypes";

type Props = {
  params: {
    slug: string;
    secondarySlug: string;
  };
};

const Page = async ({ params }: Props) => {
  const products = await fetchProducts();
  const id = params.secondarySlug;
  const slug = params.slug;
  const product = products.find(
    (item: ProductType) => removeSpace(item.name) === slug,
  );
  const item =
    product && product.packages.find((item: PackageType) => item.id === id);
  return <PaymentPage product={product} item={item} />;
};
export default Page;
