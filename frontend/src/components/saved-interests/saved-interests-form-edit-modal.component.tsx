import ModalCustom from '@components/modal/modal-custom.component';
import { UserSavedInterest, UserSavedInterestDto } from '@interfaces/user';
import { useUserStore } from '@services/user-service/user-service';
import { useSnackbar } from '@sk-web-gui/react';
import SavedInterestsFormLogic from './saved-interests-form-logic.component';
import SavedInterestsForm from './saved-interests-form.component';
import { getFormattedLabelFromValue } from '@utils/labels';

interface SavedInterestsFormEditModalProps {
  interestData: UserSavedInterestDto;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SavedInterestsFormEditModal({
  interestData,
  show = false,
  setShow,
}: SavedInterestsFormEditModalProps) {
  const editSavedInterest = useUserStore((s) => s.editSavedInterest);
  const snackBar = useSnackbar();

  const handleOnSubmit = async (values: UserSavedInterest, context) => {
    const data: UserSavedInterestDto = {
      category: values.category,
      level: values.level,
      studyLocation: values.studyLocation,
      timeInterval: values.timeInterval,
      timeIntervalFrom: values.timeIntervalFrom,
      timeIntervalTo: values.timeIntervalTo,
    };
    const res = await editSavedInterest(values.id, data);
    if (!res.error) {
      context.reset();
      setShow(false);
      snackBar({
        message: 'Intresseområdet sparades.',
        status: 'success',
      });
    } else {
      snackBar({
        message: 'Det gick inte att spara intresseområdet.',
        status: 'error',
      });
    }
  };

  return (
    <ModalCustom show={show} className="w-full desktop:!w-[72rem]" onClose={() => setShow(false)}>
      <h1>Ändra kort för intresseområde {getFormattedLabelFromValue(interestData.category)}</h1>
      <SavedInterestsFormLogic formData={interestData} onSubmit={handleOnSubmit}>
        <SavedInterestsForm mode="edit" />
      </SavedInterestsFormLogic>
    </ModalCustom>
  );
}
