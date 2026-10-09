export default function SectionTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <>
      <h2
        className="relative 
        text-4xl
        font-bold pl-5 mb-5
      
      before:content-['']
      before:absolute
      before:h-10 
      before:w-3
      before:bg-green-700
      before:rounded-sm
     before:left-0 before:top-1
      "
      >
        {subTitle} <span className="text-green-700">{title}</span>
      </h2>
    </>
  );
}
