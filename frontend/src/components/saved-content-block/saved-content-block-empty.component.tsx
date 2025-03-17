export default function SavedContentBlockEmpty({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[1.7rem] leading-[2.5rem] desktop:text-[2.1rem] desktop:leading-[3rem] p-md grow text-center flex items-center">
      {children}
    </div>
  );
}
