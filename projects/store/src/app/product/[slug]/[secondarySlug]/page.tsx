import { fetchProducts } from "lib/api";
import { PackageType, ProductType } from "types/globalTypes";
import { removeSpace } from "utils/removeSpace";
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
    (item: ProductType) => removeSpace(item.name) === slug,
  );
  const item =
    product && product.packages.find((item: PackageType) => item.id === id);
  return <PaymentPage product={product} item={item} />;
};
export default Page;
