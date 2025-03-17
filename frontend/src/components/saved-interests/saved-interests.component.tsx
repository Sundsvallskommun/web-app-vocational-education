import Button from '@components/button/button.component';
import SavedContentBlockEmpty from '@components/saved-content-block/saved-content-block-empty.component';
import SavedContentBlock from '@components/saved-content-block/saved-content-block.component';
import { UserSavedInterest } from '@interfaces/user';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { emptyUserSavedInterest } from '@services/user-service/defaults';
import { useUserStore } from '@services/user-service/user-service';
import { Button as SKButton, cx, useSnackbar, useThemeQueries } from '@sk-web-gui/react';
import { getFormattedLabelFromValue } from '@utils/labels';
import { serializeURL } from '@utils/url';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import SavedInterestsFormEditModal from './saved-interests-form-edit-modal.component';

export default function SavedInterests() {
  const userSavedInterests = useUserStore((s) => s.userSavedInterests);
  const getSavedInterests = useUserStore((s) => s.getSavedInterests);
  const deleteSavedInterest = useUserStore((s) => s.deleteSavedInterest);
  const [showEditModal, setShowEditModal] = useState(false);
  const snackBar = useSnackbar();
  const [selectedInterest, setSelectedInterest] = useState<Partial<UserSavedInterest>>(emptyUserSavedInterest);
  const { isMinDesktop } = useThemeQueries();

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

  const handleSetShowModal = (value: boolean) => {
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
                    <div className="mt-[.9rem] leading-[140%] text-[1rem] desktop:text-sm text-label">
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
                  <span className="saved-interest-header-texts-meta mb-md text-label text-[1rem] desktop:text-sm leading-[1.8rem]">{`Uppdaterad ${dayjs(interest.updatedAt).format('YYYY-MM-DD')}`}</span>
                </div>
              </div>
              <div className="saved-interest-body flex flex-wrap mt-sm desktop:grid desktop:grid-cols-2">
                {interest.timeInterval !== '0' && (
                  <div
                    className={cx(
                      'flex justify-between desktop:block leading-[2.6rem] py-sm desktop:py-[2.5rem] w-full',
                      { 'border-b-1 border-divider': true }
                    )}
                  >
                    <div className="desktop:max-w-[75%]">Pågående under perioden</div>
                    <strong>{interest.ongoing}</strong>
                  </div>
                )}
                <div
                  className={cx(
                    'flex justify-between desktop:block leading-[2.6rem] py-sm desktop:py-[2.5rem] w-full',
                    { 'border-b-1 border-divider': true }
                  )}
                >
                  <div className="desktop:max-w-[75%]">Kapacitet utbildningsplatser</div>
                  <strong>{interest.capacity}</strong>
                </div>
                <div
                  className={cx(
                    'flex justify-between desktop:block leading-[2.6rem] py-sm desktop:py-[2.5rem] w-full',
                    { 'border-b-1 border-divider': true }
                  )}
                >
                  <div className="desktop:max-w-[75%]">Plannerade utbildningstarter</div>
                  <strong>{interest.planned}</strong>
                </div>
                <div
                  className={cx(
                    'flex justify-between desktop:block leading-[2.6rem] py-sm desktop:py-[2.5rem] w-full',
                    {
                      'border-b-1 border-divider': interest.timeInterval !== '0' || !isMinDesktop,
                    }
                  )}
                >
                  <div className="desktop:max-w-[75%]">Tillgängliga utbildningsplatser</div>
                  <strong>{interest.available}</strong>
                </div>
                <div className="flex justify-between desktop:block leading-[2.6rem] py-sm desktop:py-[2.5rem] w-full">
                  <div className="desktop:max-w-[75%]">Slutförda under perioden</div>
                  <strong>{interest.ended}</strong>
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
                  <Button variant="secondary" as="span" dense rightIcon={<ArrowForwardIcon />}>
                    <span>Visa utbildningar</span>
                  </Button>
                </NextLink>
              </div>
              <div className="saved-interest-header-toolbar flex gap-sm justify-end absolute -top-[1.35rem] -right-[.5rem] desktop:-top-[1.4rem] desktop:-right-[3rem]">
                <SKButton
                  variant="ghost"
                  aria-label={`Radera, ${interest.category} - ${interest.level} - ${interest.studyLocation.join(', ')}`}
                  className="text-[1rem] desktop:text-sm px-0 text-blue underline hover:no-underline"
                  onClick={handleRemoveInterest(interestIndex)}
                  rightIcon={<DeleteIcon className="!text-[1.6rem]" />}
                >
                  <span>Radera</span>
                </SKButton>
                <SKButton
                  variant="ghost"
                  aria-label={`Ändra, ${interest.category} - ${interest.level} - ${interest.studyLocation.join(', ')}`}
                  className="text-[1rem] desktop:text-sm px-0 text-blue underline hover:no-underline"
                  onClick={handleEditInterest(interestIndex)}
                  rightIcon={<EditIcon className="!text-[1.6rem]" />}
                >
                  <span>Ändra</span>
                </SKButton>
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
          interestData={{ ...emptyUserSavedInterest, ...(selectedInterest as UserSavedInterest) }}
          show={showEditModal}
          setShow={handleSetShowModal}
        />
      )}
    </div>
  );
}
