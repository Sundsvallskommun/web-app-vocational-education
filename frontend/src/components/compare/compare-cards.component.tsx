import DropCard from '@components/card/drop-card.component';
import SchoolIcon from '@mui/icons-material/School';
import { Checkbox, Pagination } from '@sk-web-gui/react';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { Course } from '@interfaces/education';
import { getEducationLengthString } from '@services/education-service/education-service';
import 'swiper/css';
import { routeDynamicSlugFormat } from '@utils/app-url';
import { fallbackDataValue } from '@utils/labels';
import dayjs from 'dayjs';

export const CompareCards: React.FC<{ compareList: Course[]; onRemove?: (item: Course) => void }> = ({
  compareList,
  onRemove,
}) => {
  const compareSwiperRef = useRef(null);

  const [page, setPage] = useState<number>(1);

  const handlePagination = (page: number) => {
    /** @ts-expect-error Swiper attaches swiper */
    compareSwiperRef?.current?.swiper.slideTo(page - 1);
    setPage(page);
  };

  const handleOnRemove = (item: Course) => () => {
    onRemove?.(item);
  };

  return (
    <div>
      <Swiper
        ref={compareSwiperRef}
        slidesPerView={1.2}
        centeredSlides={true}
        breakpoints={{
          768: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: false,
          },
        }}
        className="compareSwiper items-stretch"
      >
        {compareList.map((edu) => {
          return (
            <SwiperSlide key={`${edu.id}`} className="!h-auto">
              <div className="flex flex-col h-full w-[270px] medium-device:w-[300px] desktop:w-full">
                <DropCard
                  className="grow"
                  classNameCard="min-h-[492px] w-[270px] medium-device:w-[300px] desktop:w-full"
                  href={`/utbildningar/${routeDynamicSlugFormat({ slug: '/utbildningar/[utbildning]', data: edu })}`}
                  dropIcon={<SchoolIcon className="material-icon !text-2xl" />}
                  footer={<></>}
                >
                  <h3>{edu.name}</h3>
                  <div className="text-sm grid grid-cols-1 gap-sm mt-[12px]">
                    <div>
                      <div className="label">Längd</div>
                      <div>
                        <strong>
                          {edu.start && edu.end ? getEducationLengthString(edu.start, edu.end) : fallbackDataValue()}
                        </strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Plats</div>
                      <div>
                        <strong>{edu?.studyLocation ? edu?.studyLocation?.split(',') : fallbackDataValue()}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Start</div>
                      <div>
                        <strong>{edu?.start ?? fallbackDataValue()}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Studietakt</div>
                      <div>
                        <strong>{edu.scope ? edu?.scope + '%' : fallbackDataValue()}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Utbildningsform</div>
                      <div>
                        <strong className="capitalize">{edu.level ?? fallbackDataValue()}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Distans</div>
                      <div>
                        <strong>{fallbackDataValue()}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Sista ansökningsdatum</div>
                      <div>
                        <strong>
                          {edu?.latestApplication ?
                            dayjs(edu?.latestApplication).format('YYYY-MM-DD')
                          : fallbackDataValue()}
                        </strong>
                      </div>
                    </div>
                  </div>
                </DropCard>
                <div className="mt-sm flex justify-end">
                  <Checkbox checked onChange={handleOnRemove(edu)}>
                    Jämför utbildning
                  </Checkbox>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {compareList.length > 1 && (
        <div className="flex justify-center mt-xl medium-device:mt-2xl">
          <Pagination
            className="pagination override"
            changePage={handlePagination}
            activePage={page}
            pages={compareList.length}
          />
        </div>
      )}
    </div>
  );
};

export default CompareCards;
