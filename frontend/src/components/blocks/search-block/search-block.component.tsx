import ContentBlock from '@components/block/content-block.component';
import Search from '@components/search/search.component';

export default function SearchBlock({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <ContentBlock classNameWrapper="SearchBlock">
      <div className="flex w-full justify-center">
        <div className="flex flex-col max-w-[720px]">
          <h2 className="text-center">Sugen på att börja studera?</h2>
          <p className="text">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Exercitation veniam consequat sunt nostrud
            amet.
          </p>
          <Search className="mt-lg" />
        </div>
      </div>
    </ContentBlock>
  );
}
