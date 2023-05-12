'use client';

interface FetchingProps {
  isFetching?: boolean;
  fetchingLabel: string;
  label: string;
}

const Fetching: React.FC<FetchingProps> = ({
  isFetching,
  fetchingLabel,
  label
}) => {
  return ( 
    <div>            
    {isFetching ? (
      <p>{fetchingLabel}</p>
    ) : (
      <p>{label}</p>
    )}
  </div>
   );
}
 
export default Fetching;