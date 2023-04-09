interface PostsGridProps {
  children: React.ReactNode;
}

export const PostsGrid = ({ children }: PostsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
};
