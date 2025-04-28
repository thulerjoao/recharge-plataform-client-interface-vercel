import PaymentPage from "./index";

type Props = {
  params: {
    slug: string;
    secondarySlug: string;
  };
};

const Page = async ({ params }: Props) => {
  const id = params.secondarySlug;
  const slug = params.slug;
  return <PaymentPage id={id} slug={slug} />;
};
export default Page;
