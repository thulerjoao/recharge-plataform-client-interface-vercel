import PaymentPage from "./index";

type Props = {
  params: {
    slug: string;
    secondarySlug: string;
  };
  searchParams: {
    coupon: string;
  };
};

const Page = async ({ params, searchParams }: Props) => {
  const id = params.secondarySlug;
  const slug = params.slug;
  const coupon = searchParams.coupon;
  return (
    <PaymentPage id={id} slug={slug} initialCoupon={searchParams.coupon} />
  );
};
export default Page;
