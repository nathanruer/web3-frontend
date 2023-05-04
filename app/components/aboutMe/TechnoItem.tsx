'use client';

interface TechnoItemProps {
  label: string;
  src: string;
}

const TechnoItem: React.FC<TechnoItemProps> = ({
  label,
  src,
}) => {
  return (
    <div className="px-12 lg:px-20 py-4 bg-white rounded-xl text-gray-900">
      <div className="flex items-center gap-3 text-xl">
        <img src={src} width='30px'/>
        {label}
      </div>
    </div>
  )
}

export default TechnoItem