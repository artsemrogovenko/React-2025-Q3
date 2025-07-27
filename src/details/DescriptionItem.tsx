export const DescriptionItem = (
  title: string,
  value: string,
  valueStyle?: string
) => {
  return (
    <div data-testid="description-item" className="flex flex-col">
      <h3 className="text-[2.5vw] font-bold">{title}</h3>
      <span className={valueStyle ?? 'text-[2.5vw]'}>{value}</span>
    </div>
  );
};
