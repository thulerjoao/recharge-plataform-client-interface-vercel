import { fetchProducts } from "lib/api";

import { PackageType, ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import PaymentPage from "./index";

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
    (item: ProductType) => formatString(item.name) === slug,
  );
  const item =
    product &&
    product.packages.find((item: PackageType) => formatString(item.id) === id);
  return <PaymentPage product={product} item={item} />;
};
export default Page;
