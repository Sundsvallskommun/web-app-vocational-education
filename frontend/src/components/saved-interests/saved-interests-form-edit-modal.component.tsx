import { UserSavedInterest, UserSavedInterestDto } from '@interfaces/user';
import { useUserStore } from '@services/user-service/user-service';
import { Modal, useSnackbar } from '@sk-web-gui/react';
import SavedInterestsFormLogic from './saved-interests-form-logic.component';
import SavedInterestsForm from './saved-interests-form.component';

export default function SavedInterestsFormEditModal({ interestData, show = false, setShow }) {
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
    <Modal show={show} label="Editera intresseområdet" className="!w-[60rem]" onClose={() => setShow(false)}>
      <SavedInterestsFormLogic formData={interestData} onSubmit={handleOnSubmit}>
        <SavedInterestsForm mode="edit" />
      </SavedInterestsFormLogic>
    </Modal>
  );
}
