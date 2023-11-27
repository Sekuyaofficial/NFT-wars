import { Loader } from '../Loader/Loader';

export const PageLoader = () => {
  return (
    <div
      css={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 21,
      }}
    >
      <Loader />
    </div>
  );
};
