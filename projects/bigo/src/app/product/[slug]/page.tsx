import ProductPage from "./index";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const slug = params.slug;
  return <ProductPage slug={slug} />;
};
export default Page;
