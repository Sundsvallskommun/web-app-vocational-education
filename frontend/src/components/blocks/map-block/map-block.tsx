import ContentBlock from '@components/block/content-block.component';
import { MapBlock as MapBlockType } from '@interfaces/admin-data';
import Image from 'next/image';

interface MapBlockProps {
  mapBlock?: MapBlockType;
}

export default function MapBlock({ mapBlock }: MapBlockProps) {
  if (!mapBlock?.showBlock) return <></>;
  return (
    <ContentBlock classNameWrapper="MapBlock" className="!max-w-full !p-0" fitHeight>
      <div className="bg-green-background text-white mt-2xl desktop:mt-3xl">
        <div className="desktop:container">
          <div className="grid desktop:grid-cols-3 bg-green-background">
            <div className="mx-auto w-[290px] desktop:w-[550px] desktop:order-2 relative">
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
            <div className="container bg-green-background p-sm medium-device-min:p-lg desktop:p-0 desktop:col-span-2">
              <h2 className='text-static-white-header'>{mapBlock.title}</h2>
              <p className="text !text-static-white mt-[2rem]">{mapBlock.text}</p>
            </div>
          </div>
        </div>
      </div>
    </ContentBlock>
  );
}
