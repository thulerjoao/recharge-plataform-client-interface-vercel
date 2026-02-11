import PaymentPage from "./index";

type Props = {
  params: Promise<{
    slug: string;
    secondarySlug: string;
  }>;
  searchParams: Promise<{
    coupon?: string;
  }>;
};

const Page = async ({ params, searchParams }: Props) => {
  const { slug, secondarySlug: id } = await params;
  const { coupon } = await searchParams;
  return (
    <PaymentPage
      slug={slug}
      packageId={id}
      couponFromParams={coupon}
    />
  );
};
export default Page;
