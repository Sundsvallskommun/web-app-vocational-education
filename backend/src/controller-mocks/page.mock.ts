import { MockServices } from '@/services/controller.service';
import { educationsMocks } from './educations.mock';
import { ControllerEndpointMocks } from './types';

export const pageMocks = {
  '/page': {
    get: ({ req }) => ({
      prisma: {
        page: {
          findUnique: async ({ where }) => {
            if (where.pageName === 'test-important-dates') {
              return {
                id: 20,
                url: '/test-viktiga-datum',
                pageName: 'test-important-dates',
                title: 'Test Important Dates',
                description: 'Test Important Dates Description',
                imgSrc: 'http://localhost:3001/api/media\\test.jpg',
                imgAlt: 'Test Alt',
                imgTitle: 'test.jpg',
                showImgInDesktop: true,
                showImgInMobile: true,
                showSearchBar: false,
                employerPromotionsBlockId: null,
                showEmployerPromotionsBlock: false,
                wysiwyg_content: '<h2>Test Important Dates Content</h2><p>Some text</p>',
                showEducationsRelatedBlock: false,
                showEducationsStartingBlock: false,
                showSearchBlock: false,
                blockOrder:
                  'wysiwyg_content,tableBlock,promotionsBlock,mapBlock,employerPromotionsBlock,educationsStartingBlock,importantDatesBlock,faqBlock,contactFormBlock,searchBlock,logosBlock',
                promotionsBlock: [],
                employerPromotionsBlock: null,
                mapBlock: [],
                importantDatesBlock: [
                  {
                    id: 2,
                    pageName: 'test-important-dates',
                    pageId: 20,
                    showBlock: true,
                    showSeeAllButton: true,
                    showAll: false,
                    amountShown: 3,
                    title: 'Test Important Dates',
                    referencedImportantDatesBlockId: null,
                    referencedImportantDatesBlockPageName: 'test-important-dates',
                    referencedImportantDatesBlockPageId: null,
                    dateCards: [
                      {
                        id: 15,
                        pageName: 'test-important-dates',
                        pageId: 20,
                        blockId: 2,
                        date: '9024-12-16',
                        title: 'test2',
                        text: 'test2',
                      },
                    ],
                    referencedImportantDatesBlockPageUrl: '/test-viktiga-datum',
                  },
                ],
                faqBlock: [],
                contactFormBlock: [],
                logosBlock: [],
                tableBlock: [],
              };
            } else {
              return {
                id: 7,
                url: req.query.url,
                pageName: 'test_page',
                title: req.query.url,
                description: 'Test Description',
                imgSrc: 'http://localhost:3001/api/media\\test.jpg',
                imgAlt: 'Test Alt',
                imgTitle: 'test.jpg',
                showImgInDesktop: true,
                showImgInMobile: true,
                showSearchBar: true,
                employerPromotionsBlockId: 1,
                showEmployerPromotionsBlock: false,
                wysiwyg_content: '<p><strong>Test Content</strong></p>',
                showEducationsRelatedBlock: true,
                showEducationsStartingBlock: true,
                showSearchBlock: false,
                blockOrder:
                  'wysiwyg_content,tableBlock,promotionsBlock,educationsStartingBlock,importantDatesBlock,mapBlock,employerPromotionsBlock,faqBlock,contactFormBlock,searchBlock,logosBlock',
                promotionsBlock: [
                  {
                    id: 2,
                    pageName: 'test_page',
                    pageId: 7,
                    showBlock: true,
                    promotions: [
                      {
                        id: 43,
                        blockId: 2,
                        pageName: 'test_page',
                        pageId: 7,
                        promotedPageName: 'test_promoted_page',
                        promotedPageId: 4,
                        promotedPage: {
                          id: 4,
                          url: '/test/promoted',
                          pageName: 'test_promoted_page',
                          title: 'Promoted Title',
                          description: 'Promoted Description',
                          imgSrc: 'http://localhost:3001/api/media\\test.jpg',
                          imgAlt: 'Promoted Alt',
                          imgTitle: 'test.jpg',
                          showImgInDesktop: true,
                          showImgInMobile: true,
                          showSearchBar: false,
                          employerPromotionsBlockId: null,
                          showEmployerPromotionsBlock: false,
                          wysiwyg_content: '<h2>Test Promoted Content</h2><p>Some text</p>',
                          showEducationsRelatedBlock: false,
                          showEducationsStartingBlock: false,
                          showSearchBlock: false,
                          blockOrder:
                            'wysiwyg_content,tableBlock,promotionsBlock,mapBlock,employerPromotionsBlock,educationsStartingBlock,importantDatesBlock,faqBlock,contactFormBlock,searchBlock,logosBlock',
                        },
                      },
                    ],
                  },
                ],
                employerPromotionsBlock: {
                  id: 1,
                  showBlock: true,
                  title: 'Test Employer Promotions Title',
                  employerPromotions: [
                    {
                      id: 1,
                      blockId: 1,
                      title: 'test_employer_title1',
                      ingress: 'test_employer_text1',
                      wysiwyg_content: 'Test WYSIWYG',
                      searchPhrase: 'test_employer_search1',
                    },
                  ],
                },
                mapBlock: [
                  {
                    id: 1,
                    pageName: 'test_page',
                    pageId: 7,
                    showBlock: true,
                    title: 'Test Map Title',
                    text: 'Test Map Text',
                    buttonText: 'Test Button',
                  },
                ],
                importantDatesBlock: [
                  {
                    id: 1,
                    pageName: 'test_page',
                    pageId: 7,
                    showBlock: true,
                    showSeeAllButton: true,
                    showAll: false,
                    amountShown: 3,
                    title: 'Test Important Dates',
                    referencedImportantDatesBlockId: null,
                    referencedImportantDatesBlockPageName: 'test-important-dates',
                    referencedImportantDatesBlockPageId: null,
                    dateCards: [
                      {
                        id: 15,
                        pageName: 'test-important-dates',
                        pageId: 20,
                        blockId: 2,
                        date: '2024-12-16',
                        title: 'test2',
                        text: 'test2',
                      },
                    ],
                    referencedImportantDatesBlockPageUrl: '/test-viktiga-datum',
                  },
                ],
                faqBlock: [
                  {
                    id: 3,
                    pageName: 'test_page',
                    pageId: 7,
                    showBlock: true,
                    title: 'Test FAQ',
                    description: 'Test FAQ Description',
                    questions: [
                      {
                        id: 7,
                        pageName: 'test_page',
                        pageId: 7,
                        blockId: 3,
                        question: 'test_faq_question1',
                        answer: 'test_faq_answer1',
                      },
                    ],
                  },
                ],
                contactFormBlock: [
                  {
                    id: 6,
                    pageName: 'test_page',
                    pageId: 7,
                    title: 'Test Contact Title',
                    description: 'Test Contact Description',
                    showBlock: true,
                    emails: [
                      {
                        id: 5,
                        pageId: 7,
                        formId: 6,
                        label: 'Test Label',
                        email: 'test@example.com',
                      },
                    ],
                  },
                ],
                logosBlock: [
                  {
                    id: 1,
                    pageName: 'test_page',
                    pageId: 7,
                    title: 'Test Logos Title',
                    description: 'Test Logos Description',
                    showBlock: true,
                    logos: [],
                  },
                ],
                tableBlock: [
                  {
                    id: 4,
                    pageName: 'test_page',
                    pageId: 7,
                    title: 'Test Table',
                    summary: 'Test Table Summary',
                    showBlock: true,
                    rows: [
                      {
                        id: 4,
                        tableId: 4,
                        pageId: 7,
                        cells: [
                          {
                            id: 7,
                            headerId: 9,
                            rowId: 4,
                            pageId: 7,
                            tableId: 4,
                            wysiwyg_content: 'test_data1',
                          },
                        ],
                      },
                    ],
                    headers: [
                      {
                        id: 7,
                        tableId: 4,
                        pageId: 7,
                        name: 'test_header1',
                        sortable: false,
                        hidden: false,
                      },
                    ],
                    cells: [
                      {
                        id: 7,
                        headerId: 9,
                        rowId: 4,
                        pageId: 7,
                        tableId: 4,
                        wysiwyg_content: 'test_data1',
                      },
                    ],
                  },
                ],
              };
            }
          },
        },
      },
      apiService: {
        // fetching related educations
        ...educationsMocks['/education-events'].get.apiService,
      },
    }),
  },
} satisfies ControllerEndpointMocks<MockServices>;
