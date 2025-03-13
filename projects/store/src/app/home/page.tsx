import { fetchProducts } from "lib/api";
import Home from "./util/home";

const Page = async () => {
  const products = await fetchProducts();
  return <Home products={products} />;
};
export default Page;
