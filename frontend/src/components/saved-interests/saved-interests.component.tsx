import ButtonStackedIcon from '@components/button/button-stacked-icon.component';
import Button from '@components/button/button.component';
import SavedContentBlockEmpty from '@components/saved-content-block/saved-content-block-empty.component';
import SavedContentBlock from '@components/saved-content-block/saved-content-block.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { emptyUserSavedInterest } from '@services/user-service/defaults';
import { useUserStore } from '@services/user-service/user-service';
import { useSnackbar } from '@sk-web-gui/react';
import { serializeURL } from '@utils/url';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import SavedInterestsFormEditModal from './saved-interests-form-edit-modal.component';
import { UserSavedInterest } from '@interfaces/user';
import { getFormattedLabelFromValue } from '@utils/labels';

export default function SavedInterests() {
  const userSavedInterests = useUserStore((s) => s.userSavedInterests);
  const getSavedInterests = useUserStore((s) => s.getSavedInterests);
  const deleteSavedInterest = useUserStore((s) => s.deleteSavedInterest);
  const [showEditModal, setShowEditModal] = useState(false);
  const snackBar = useSnackbar();
  const [selectedInterest, setSelectedInterest] = useState<Partial<UserSavedInterest>>(emptyUserSavedInterest);

  const handleRemoveInterest = (index: number) => async () => {
    const res = await deleteSavedInterest(userSavedInterests[index].id);
    if (!res.error) {
      snackBar({
        message: 'Det sparade intresseområdet är nu borttagen.',
        status: 'success',
      });
    } else {
      snackBar({
        message: 'Det gick inte att ta bort det sparade intresseområdet.',
        status: 'error',
      });
    }
  };

  const handleSetShowModal = (value) => {
    setSelectedInterest(emptyUserSavedInterest);
    setShowEditModal(value);
  };

  const handleEditInterest = (index: number) => async () => {
    setSelectedInterest({ ...userSavedInterests[index] });
    setShowEditModal(true);
  };

  useEffect(() => {
    getSavedInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-[3rem] mt-[4rem]">
      {userSavedInterests.length > 0 ?
        userSavedInterests.map((interest, interestIndex) => (
          <SavedContentBlock key={`${interest.id}`} className="!pb-[4.7rem]">
            <div className="relative">
              <div className="saved-interest-header flex relative items-start">
                <div className="saved-interest-header-texts grow flex flex-col-reverse">
                  <div className="saved-interest-header-texts-heading">
                    <h3>
                      {`${getFormattedLabelFromValue(interest.category)}`}
                      {interest.level && ` - ${getFormattedLabelFromValue(interest.level)}`}
                    </h3>
                    <div className="mt-[.9rem] text-sm text-label">
                      {interest.studyLocation.map((location, i) => (
                        <span key={`${location}`}>
                          {getFormattedLabelFromValue(location)}
                          {i < interest.studyLocation.length - 1 && ' | '}
                        </span>
                      ))}
                      {' | '}
                      {interest.timeInterval === '0' ?
                        <span>{`${dayjs(interest.timeIntervalFrom).format('YYYY-MM-DD')} till ${dayjs(interest.timeIntervalTo).format('YYYY-MM-DD')}`}</span>
                      : <span>{interest.timeInterval} månader framåt</span>}
                    </div>
                  </div>
                  <span className="saved-interest-header-texts-meta mb-[1.8rem] text-label text-xs leading-[1.8rem]">{`Uppdaterad ${dayjs(interest.updatedAt).format('YYYY-MM-DD')}`}</span>
                </div>
              </div>
              <div className="saved-interest-body grid grid-cols-2">
                <div className="divide-y-1 divide-divider">
                  {interest.timeInterval !== '0' && (
                    <div className="leading-[2.6rem] py-[2.5rem]">
                      Pågående
                      <br />
                      utbildningar
                      <br />
                      <strong>{interest.ongoing}</strong>
                    </div>
                  )}
                  <div className="leading-[2.6rem] py-[2.5rem]">
                    Planerade
                    <br />
                    utbildningar
                    <br />
                    <strong>{interest.planned}</strong>
                  </div>
                  <div className="leading-[2.6rem] py-[2.5rem]">
                    Avslutade utbildningar
                    <br />
                    <strong>{interest.ended}</strong>
                  </div>
                </div>

                <div className="divide-y-1 divide-divider">
                  <div className="leading-[2.6rem] py-[2.5rem]">
                    Kapacitet
                    <br />
                    utbildningsplatser
                    <br />
                    <strong>{interest.capacity}</strong>
                  </div>
                  <div className="leading-[2.6rem] py-[2.5rem]">
                    Tillgängliga
                    <br />
                    utbildningsplatser
                    <br />
                    <strong>{interest.available}</strong>
                  </div>
                  {interest.timeInterval !== '0' && <div></div>}
                </div>
              </div>
              <div className="mt-[4.3rem] flex justify-center">
                <NextLink
                  href={{
                    pathname: '/utbildningar/sok',
                    query: serializeURL({
                      category: [interest.category],
                      level: [interest.level],
                      studyLocation: interest.studyLocation,
                    }),
                  }}
                >
                  <Button as="span" dense rightIcon={<ArrowForwardIcon />}>
                    <span>Visa utbildningar</span>
                  </Button>
                </NextLink>
              </div>
              <div className="saved-interest-header-toolbar flex gap-md justify-end absolute -top-[1.5rem] -right-[1.5rem] desktop:-top-[1.5rem] desktop:-right-[3rem]">
                <ButtonStackedIcon
                  onClick={handleRemoveInterest(interestIndex)}
                  className="text-[12px] text-blue"
                  icon={<DeleteIcon />}
                  aria-label={`Radera, ${interest.category} - ${interest.level} - ${interest.studyLocation.join(', ')}`}
                >
                  Radera
                </ButtonStackedIcon>
                <ButtonStackedIcon
                  onClick={handleEditInterest(interestIndex)}
                  className="text-[12px] text-blue"
                  icon={<EditIcon />}
                  aria-label={`Ändra, ${interest.category} - ${interest.level} - ${interest.studyLocation.join(', ')}`}
                >
                  Ändra
                </ButtonStackedIcon>
              </div>
            </div>
          </SavedContentBlock>
        ))
      : <SavedContentBlock>
          <SavedContentBlockEmpty>Lägg till dina intresseområden här ovan</SavedContentBlockEmpty>
        </SavedContentBlock>
      }
      {showEditModal && (
        <SavedInterestsFormEditModal
          interestData={{ ...emptyUserSavedInterest, ...selectedInterest }}
          show={showEditModal}
          setShow={handleSetShowModal}
        />
      )}
    </div>
  );
}
