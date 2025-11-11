import DropCard from '@components/card/drop-card.component';
import { Course } from '@interfaces/education';
import SchoolIcon from '@mui/icons-material/School';
import { getEducationLengthString } from '@services/education-service/education-service';
import { Checkbox, Pagination, useThemeQueries } from '@sk-web-gui/react';
import { routeDynamicSlugFormat } from '@utils/app-url';
import { orFallbackDataValue } from '@utils/labels';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export const CompareCards: React.FC<{ compareList: Course[]; onRemove?: (item: Course) => void }> = ({
  compareList,
  onRemove,
}) => {
  const compareSwiperRef = useRef(null);
  const { isMinMediumDevice, isMinLargeDevice } = useThemeQueries();
  const slidesPerView =
    isMinLargeDevice ? 4
    : isMinMediumDevice ? 2.5
    : 1.2;

  const [page, setPage] = useState<number>(1);

  const handlePagination = (page: number) => {
    /** @ts-expect-error Swiper attaches swiper on mount */
    compareSwiperRef?.current?.swiper.slideTo((page - 1) * slidesPerView);
    setPage(page);
  };

  const handleOnRemove = (item: Course) => () => {
    onRemove?.(item);
  };

  return (
    <div>
      <Swiper
        aria-label="Jämför utbildningar"
        ref={compareSwiperRef}
        slidesPerView={slidesPerView}
        centeredSlides={true}
        breakpoints={{
          768: {
            slidesPerView: slidesPerView,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: slidesPerView,
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
                          {orFallbackDataValue(
                            edu.start && edu.end ? getEducationLengthString(edu.start, edu.end) : null
                          )}
                        </strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Plats</div>
                      <div>
                        <strong>{orFallbackDataValue(edu?.studyLocation)}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Start</div>
                      <div>
                        <strong>{orFallbackDataValue(edu?.start)}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Studietakt</div>
                      <div>
                        <strong>{orFallbackDataValue(edu.scope ? edu?.scope + '%' : null)}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Utbildningsform</div>
                      <div>
                        <strong className="capitalize">{orFallbackDataValue(edu.level)}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Distans</div>
                      <div>
                        <strong>{orFallbackDataValue()}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Sista ansökningsdatum</div>
                      <div>
                        <strong>
                          {orFallbackDataValue(
                            edu?.latestApplication ? dayjs(edu?.latestApplication).format('YYYY-MM-DD') : null
                          )}
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
            pages={Math.ceil(compareList.length / slidesPerView)}
          />
        </div>
      )}
    </div>
  );
};

export default CompareCards;
