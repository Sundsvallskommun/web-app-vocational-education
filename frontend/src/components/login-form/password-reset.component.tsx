import { Modal } from '@sk-web-gui/react';

export default function PasswordReset({ show, setShow }: { show: boolean; setShow: (show: boolean) => void }) {
  return (
    <Modal show={show} label="Glömt lösenord" className="!w-[33rem]" onClose={() => setShow(false)}>
      <p>För tillfället, kontakta din närmsta konto-ansvarige för att återställa lösenordet.</p>
    </Modal>
  );
}
