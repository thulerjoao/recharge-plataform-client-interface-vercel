import { SkeletonContainer } from "./style";

const SkeletonOrderCard = () => {
  return (
    <>
      <SkeletonContainer>
        <div />
      </SkeletonContainer>
      <SkeletonContainer opacity={0.8}>
        <div />
      </SkeletonContainer>
      <SkeletonContainer opacity={0.6}>
        <div />
      </SkeletonContainer>
    </>
  );
};

export default SkeletonOrderCard;
