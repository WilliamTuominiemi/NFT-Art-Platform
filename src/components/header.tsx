interface HeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const Header = ({ title, description, children }: HeaderProps) => {
  return (
    <div className="mb-12 flex justify-between">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
        <p className="text-slate-500">{description}</p>
      </div>
      {children}
    </div>
  );
};
