import ButtonStackedIcon from '@components/button/button-stacked-icon.component';
import Button from '@components/button/button.component';
import SavedContentBlockEmpty from '@components/saved-content-block/saved-content-block-empty.component';
import SavedContentBlock from '@components/saved-content-block/saved-content-block.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUserStore } from '@services/user-service/user-service';
import { useSnackbar } from '@sk-web-gui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import SavedInterestsFormEditModal from './saved-interests-form-edit-modal.component';
import { emptyUserSavedInterest } from '@services/user-service/defaults';
import NextLink from 'next/link';
import { objToQueryString } from '@utils/url';

export default function SavedInterests() {
  const userSavedInterests = useUserStore((s) => s.userSavedInterests);
  const getSavedInterests = useUserStore((s) => s.getSavedInterests);
  const deleteSavedInterest = useUserStore((s) => s.deleteSavedInterest);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInterestIndex, setSelectedInterestIndex] = useState(null);
  const snackBar = useSnackbar();

  const selectedInterest =
    selectedInterestIndex !== null ?
      Object.assign({}, emptyUserSavedInterest, userSavedInterests[selectedInterestIndex])
    : emptyUserSavedInterest;

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
    setSelectedInterestIndex(null);
    setShowEditModal(value);
  };

  const handleEditInterest = (index: number) => async () => {
    setSelectedInterestIndex(index);
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
                      {`${interest.category}`}
                      {interest.type && ` - ${interest.type}`}
                    </h3>
                    <div className="mt-[.9rem] text-sm text-label">
                      {interest.location.map((x, i) => (
                        <span key={`${x}`}>
                          {x}
                          {i < interest.location.length - 1 && ' | '}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="saved-interest-header-texts-meta mb-[1.8rem] text-label text-xs leading-[1.8rem]">{`Uppdaterad ${dayjs(interest.updatedAt).format('YYYY-MM-DD')}`}</span>
                </div>
              </div>
              <div className="saved-interest-body  divide-y-1 divide-divider">
                <div className="grid grid-cols-2">
                  <p className="leading-[2.6rem] my-[2.5rem]">
                    Pågående
                    <br />
                    utbildningar
                    <br />
                    <strong>{interest.ongoing}</strong>
                  </p>
                  <p className="leading-[2.6rem] my-[2.5rem]">
                    Kapacitet
                    <br />
                    utbildningsplatser
                    <br />
                    <strong>{interest.capacity}</strong>
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="leading-[2.6rem] my-[2.5rem]">
                    Planerade
                    <br />
                    utbildningar
                    <br />
                    <strong>{interest.planned}</strong>
                  </p>
                  <p className="leading-[2.6rem] my-[2.5rem]">
                    Tillgängliga
                    <br />
                    utbildningsplatser
                    <br />
                    <strong>{interest.available}</strong>
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="leading-[2.6rem] my-[2.5rem]">
                    Avslutade utbildningar
                    <br />
                    <strong>{interest.ended}</strong>
                  </p>
                  <p className="leading-[2.6rem] my-[2.5rem] line-clamp-2">{interest.freetext}</p>
                </div>
              </div>
              <div className="mt-[4.3rem] flex justify-center">
                <NextLink
                  href={{
                    pathname: '/utbildningar/sok',
                    query: objToQueryString({
                      category: [interest.category],
                      type: [interest.type],
                      location: interest.location,
                    }),
                  }}
                >
                  <Button as="span" dense rightIcon={<ArrowForwardIcon />}>
                    <span>Visa utbildningar</span>
                  </Button>
                </NextLink>
              </div>
              <div className="saved-interest-header-toolbar flex gap-md justify-end absolute -top-[1.5rem] -right-[1.5rem] lg:-top-[1.5rem] lg:-right-[3rem]">
                <ButtonStackedIcon
                  onClick={handleRemoveInterest(interestIndex)}
                  className="text-[12px] text-blue"
                  icon={<DeleteIcon />}
                  aria-label={`Radera, ${interest.category} - ${interest.type} - ${interest.location.join(', ')}`}
                >
                  Radera
                </ButtonStackedIcon>
                <ButtonStackedIcon
                  onClick={handleEditInterest(interestIndex)}
                  className="text-[12px] text-blue"
                  icon={<EditIcon />}
                  aria-label={`Ändra, ${interest.category} - ${interest.type} - ${interest.location.join(', ')}`}
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
          interestData={selectedInterest}
          show={showEditModal}
          setShow={handleSetShowModal}
        />
      )}
    </div>
  );
}
