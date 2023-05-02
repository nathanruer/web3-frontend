'use client';

interface TransactionModalProps {
  label: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  label
}) => {
  return (
    <div className="flex absolute right-0 top-20 px-10 ">
      <div className="">
        {label}
      </div>
    </div>
  )
}

export default TransactionModal