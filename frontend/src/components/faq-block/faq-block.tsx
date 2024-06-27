import ContentBlock from '@components/block/content-block.component';
import { FAQBlock as FAQBlockType } from '@interfaces/admin-data';
import sanitized from '@services/sanitizer-service';
import { Accordion } from '@sk-web-gui/react';

interface FAQBlockProps {
  faqBlock?: FAQBlockType;
}

export default function FAQBlock({ faqBlock }: FAQBlockProps) {
  if (!faqBlock?.showBlock) return <></>;
  return (
    <ContentBlock>
      <div className="flex flex-col desktop:flex-row desktop:justify-between">
        <h2 className="mb-md">{faqBlock.title}</h2>
        <p className="text !max-w-[600px] leading-[1.8] m-0">{faqBlock.description}</p>
      </div>
      <Accordion className="mt-2xl flex flex-col override border-y border-divider">
        {faqBlock.questions.map((question, i) => (
          <Accordion.Item key={`${question.answer}-${i}`} header={`${question.question}`}>
            <span
              className="text"
              dangerouslySetInnerHTML={{
                __html: sanitized(question.answer || ''),
              }}
            />
          </Accordion.Item>
        ))}
      </Accordion>
    </ContentBlock>
  );
}
