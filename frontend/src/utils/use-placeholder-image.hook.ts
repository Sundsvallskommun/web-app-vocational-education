import { useEffect, useState } from 'react';

export function usePlaceholderImg(src?: string) {
  const [imageSrc, setImageSrc] = useState(`${process.env.NEXT_PUBLIC_BASE_PATH}/placeholder-ym.png`);
  useEffect(() => {
    if (src) {
      const _src = src.charAt(0) == '/' ? `${process.env.NEXT_PUBLIC_BASE_PATH}${src}` : src;
      setImageSrc(_src);
    }
  }, [src]);
  return imageSrc;
}
