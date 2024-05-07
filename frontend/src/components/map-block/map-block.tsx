import Button from '@components/button/button.component';
import { MapBlock as MapBlockType } from '@interfaces/admin-data';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

interface MapBlockProps {
  mapBlock?: MapBlockType;
}

export default function MapBlock({ mapBlock }: MapBlockProps) {
  if (!mapBlock?.showBlock) return <></>;
  return (
    <div className="bg-green text-white mt-2xl lg:mt-3xl">
      <div className="lg:container">
        <div className="grid lg:grid-cols-3 bg-green-middle lg:bg-green">
          <div className="mx-auto w-[290px] lg:w-[550px] lg:order-2 relative">
            <Image
              className="next-img"
              fill
              sizes="(max-width: 768px) 100vw"
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/karta.png`}
              alt="Bild på studenter"
              aria-hidden="true"
              quality={100}
            />
          </div>
          <div className="container bg-green p-lg lg:p-0 lg:col-span-2">
            <h2>{mapBlock.title}</h2>
            <p className="text !text-inverted-body mt-[2rem]">{mapBlock.text}</p>
            <Button className="override sk-btn-white mx-auto lg:mx-0 mt-lg mb-md" rightIcon={<ArrowForwardIcon />}>
              <span>{mapBlock.buttonText}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
