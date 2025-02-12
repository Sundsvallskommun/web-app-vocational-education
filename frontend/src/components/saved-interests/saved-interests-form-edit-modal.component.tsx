import ModalCustom from '@components/modal/modal-custom.component';
import { UserSavedInterestDto } from '@interfaces/user';
import { useUserStore } from '@services/user-service/user-service';
import { useSnackbar } from '@sk-web-gui/react';
import { getFormattedLabelFromValue } from '@utils/labels';
import { UseFormReturn } from 'react-hook-form';
import SavedInterestsFormLogic, { SavedInterestsFormValues } from './saved-interests-form-logic.component';
import SavedInterestsForm from './saved-interests-form.component';

interface SavedInterestsFormEditValues extends Omit<SavedInterestsFormValues, 'id'> {
  id: number;
}

interface SavedInterestsFormEditModalProps {
  interestData: SavedInterestsFormEditValues;
  show: boolean;
  setShow: (show: boolean) => void;
}

export default function SavedInterestsFormEditModal({
  interestData,
  show = false,
  setShow,
}: SavedInterestsFormEditModalProps) {
  const editSavedInterest = useUserStore((s) => s.editSavedInterest);
  const snackBar = useSnackbar();

  const handleOnSubmit: (
    values: SavedInterestsFormEditValues,
    context: UseFormReturn<SavedInterestsFormEditValues, unknown, undefined>
  ) => void = async (values, context) => {
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
    <ModalCustom show={show} onClose={() => setShow(false)}>
      <div>
        <h1>Ändra kort för intresseområde {getFormattedLabelFromValue(interestData.category)}</h1>
        <SavedInterestsFormLogic formData={interestData} onSubmit={handleOnSubmit}>
          <SavedInterestsForm mode="edit" />
        </SavedInterestsFormLogic>
      </div>
    </ModalCustom>
  );
}
