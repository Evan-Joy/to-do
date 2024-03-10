import React from 'react';

interface ILoadingHook {
  isLoading: boolean,
}

const LoadingComponent: React.FC<ILoadingHook> = (props) => {
  if (!props.isLoading) return <></>;

  return (
    <div id="gl-loading">
      <img id="ct-loading" src="/assets/images/gif/loading-center.svg" alt='Loading...' />
    </div>
  );
}

export default LoadingComponent;