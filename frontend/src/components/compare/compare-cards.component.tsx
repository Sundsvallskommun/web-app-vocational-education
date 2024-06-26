import DropCard from '@components/card/drop-card.component';
import SchoolIcon from '@mui/icons-material/School';
import { Checkbox, Pagination } from '@sk-web-gui/react';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { Course } from '@interfaces/education';
import { getEducationLengthString } from '@services/education-service/education-service';
import 'swiper/css';

export const CompareCards: React.FC<{ compareList: Course[]; onRemove? }> = ({ compareList, onRemove }) => {
  const compareSwiperRef = useRef(null);

  const [page, setPage] = useState<number>(1);

  const handlePagination = (page: number) => {
    compareSwiperRef.current.swiper.slideTo(page - 1);
    setPage(page);
  };

  const handleOnRemove = (item: Course) => () => {
    onRemove && onRemove(item);
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
        className="compareSwiper"
      >
        {compareList.map((edu) => {
          return (
            <SwiperSlide key={`${edu.id}`}>
              <div className="inline-block xs:w-[270px] md:w-[300px] lg:w-full">
                <DropCard
                  textFade={false}
                  classNameCard="min-h-[492px] xs:w-[270px] md:w-[300px] lg:w-full"
                  href="/"
                  dropIcon={<SchoolIcon className="material-icon !text-2xl" />}
                >
                  <h3>{edu.name}</h3>
                  <div className="text-sm grid grid-cols-1 gap-sm mt-[12px]">
                    <div>
                      <div className="label">Utbildningens längd</div>
                      <div>
                        <strong>{getEducationLengthString(edu.start, edu.end)}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Plats</div>
                      <div>
                        <strong>{edu.studyLocation}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Start</div>
                      <div>
                        <strong>{edu.start}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Studietakt</div>
                      <div>
                        <strong>{edu.scope ? edu?.scope + '%' : '-'}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Distans (?)</div>
                      <div>
                        <strong>{'(?)'}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="label">Språk (?)</div>
                      <div>
                        <strong>{'(?)'}</strong>
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
        <div className="flex justify-center mt-xl md:mt-2xl">
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
