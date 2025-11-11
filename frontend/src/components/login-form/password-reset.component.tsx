import ModalCustom from '@components/modal/modal-custom.component';

export default function PasswordReset({ show, setShow }: { show: boolean; setShow: (show: boolean) => void }) {
  return (
    <ModalCustom show={show} onClose={() => setShow(false)}>
      <h1>Glömt lösenord</h1>
      <p>För tillfället, kontakta din närmsta konto-ansvarige för att återställa lösenordet.</p>
    </ModalCustom>
  );
}
