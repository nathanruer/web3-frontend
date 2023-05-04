'use client'

interface HeadingProps {
  title: string;
  subtitle?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="pt-20 pb-10 lg:px-40 px-10">
      <p className="text-6xl font-bold text-center">
        {title}
      </p>
      <p className="text-center font-semibold text-gray-400 text-2xl pt-2">
        {subtitle}
      </p>
    </div>
  )
}

export default Heading