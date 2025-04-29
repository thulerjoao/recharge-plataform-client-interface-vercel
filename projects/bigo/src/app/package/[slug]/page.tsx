import PaymentPage from "./index";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const slug = params.slug;
  return <PaymentPage slug={slug} />;
};
export default Page;
