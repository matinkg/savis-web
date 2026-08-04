import { OffersTitleArray } from "@/configs/constants";
import OffersProducts from "@/components/_templates/offers";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const offer = OffersTitleArray.find((item) => item.key === params.id);

  return <OffersProducts offer={offer} />;
}
