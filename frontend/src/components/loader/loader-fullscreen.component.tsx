'use client';

import { Spinner } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';

export default function LoaderFullScreen() {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <main>
      <div className="w-screen h-screen flex place-items-center place-content-center">
        {showSpinner && <Spinner aria-label="Laddar information" />}
      </div>
    </main>
  );
}
