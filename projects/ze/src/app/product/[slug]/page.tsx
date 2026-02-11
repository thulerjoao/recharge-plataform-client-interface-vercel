import ProductPage from "./index";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  return <ProductPage slug={slug} />;
};
export default Page;
