import React, { useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar'

const LoadingTopPageFallBack: React.FC = () => {
  const loadingTopRef = useRef<any>(null);

  // did mount
  useEffect(() => {
    if (loadingTopRef.current) {
      loadingTopRef.current.continuousStart();
    }

    const ref = loadingTopRef.current;
    return function cleanup() {
      ref.complete();
    }
  }, []);

  return (
    <LoadingBar color='#f11946' ref={loadingTopRef} />
  );
}

export default LoadingTopPageFallBack;