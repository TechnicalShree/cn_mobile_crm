interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={`px-3 py-4 pb-16 w-full max-w-xl mx-auto ${className}`}>
      {children}
    </div>
  );
}