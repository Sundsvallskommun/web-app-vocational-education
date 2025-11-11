import { PrismaClient, UserRoleEnum } from '@prisma/client';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

let adminUser;
try {
  adminUser = JSON.parse(process.env.INIT_ADMIN_USER as string);
} catch (err) {
  throw Error('env INIT_ADMIN_USER not specified');
}

const hashedUser = Object.assign(adminUser, {
  password: bcrypt.hashSync(adminUser.password, 10),
});

const prisma = new PrismaClient();
async function main() {
  await prisma.userRole.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
    },
  });
  await prisma.userRole.upsert({
    where: { name: 'USER' },
    update: {},
    create: {
      name: 'USER',
    },
  });
  await prisma.userRole.upsert({
    where: { name: 'EDUCATIONCOORDINATOR' },
    update: {},
    create: {
      name: 'EDUCATIONCOORDINATOR',
    },
  });
  await prisma.userRole.upsert({
    where: { name: 'EDITOR' },
    update: {},
    create: {
      name: 'EDITOR',
    },
  });

  await prisma.user.upsert({
    where: { username: hashedUser.username },
    update: {
      roles: {
        upsert: hashedUser.roles.map(role => ({
          where: {
            username_role: {
              username: hashedUser.username,
              role: role,
            },
          },
          create: {
            userRole: {
              connect: {
                name: role,
              },
            },
          },
          update: {
            userRole: {
              connect: {
                name: role,
              },
            },
          },
        })),
      },
    },
    create: {
      ...hashedUser,
      roles: {
        create: hashedUser.roles.map(role => ({
          userRole: {
            connect: {
              name: role,
            },
          },
        })),
      },
    },
  });

  const arbetsgivare = await prisma.page.upsert({
    where: { pageName: 'arbetsgivare' },
    update: {},
    create: {
      url: '/arbetsgivare',
      pageName: 'arbetsgivare',
      title: 'Är du arbetsgivare?',
      description:
        'Här hittar du kandidater som är redo att börja jobba hos dig. Vi utbildar framtidens arbetskraft. Branscherna har en nyckelroll i regionens tillväxt och du som arbetsgivare kan göra skillnad!',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
      contactFormBlock: {
        create: [
          {
            title: 'Kontaktformulär',
            showBlock: true,
            emails: {
              create: [
                {
                  label: 'Sundsvall',
                  email: 'info@sundsvall.se',
                },
              ],
            },
          },
        ],
      },
    },
  });

  const utbildningar_behorighet = await prisma.page.upsert({
    where: { pageName: 'utbildningar_behorighet' },
    update: {},
    create: {
      url: '/utbildningar/behorighet',
      pageName: 'utbildningar_behorighet',
      title: 'Behörighet, betyg och meritvärden',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  const utbildningar_vagledning = await prisma.page.upsert({
    where: { pageName: 'utbildningar_vagledning' },
    update: {},
    create: {
      url: '/utbildningar/vagledning',
      pageName: 'utbildningar_vagledning',
      title: 'Jag vet inte vad jag vill. Hjälp!',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  const utbildningar_brancher = await prisma.page.upsert({
    where: { pageName: 'utbildningar_brancher' },
    update: {},
    create: {
      url: '/utbildningar/brancher',
      pageName: 'utbildningar_brancher',
      title: 'Branscherna berättar',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'utbildningar_utbildning' },
    update: {},
    create: {
      url: '/utbildningar/[utbildning]',
      pageName: 'utbildningar_utbildning',
      title: '',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
      faqBlock: {
        create: [
          {
            title: 'Vanliga frågor om yrkesutbildning',
            description: '',
            showBlock: true,
            questions: {
              create: [
                {
                  question: 'utbildningar_faq_question1',
                  answer: 'utbildningar_faq_answer1',
                },
                {
                  question: 'utbildningar_faq_question2',
                  answer: 'utbildningar_faq_answer2',
                },
                {
                  question: 'utbildningar_faq_question3',
                  answer: 'utbildningar_faq_answer3',
                },
              ],
            },
          },
        ],
      },
      showEducationsRelatedBlock: true,
      showSearchBlock: true,
    },
  });

  const utbildningar = await prisma.page.upsert({
    where: { pageName: 'utbildningar' },
    update: {},
    create: {
      url: '/utbildningar',
      pageName: 'utbildningar',
      title: 'Hitta en yrkesutbildning som leder till jobb',
      description:
        'Vill du öka dina chanser att snabbt få jobb? Här hittar du yrkesutbildningar med stora möjligheter till jobb i Västernorrland. Utbildningarna är korta och finns för dig som vill komma in på arbetsmarknaden eller karriärväxla',
      showSearchBar: true,
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
      promotionsBlock: {
        create: {
          showBlock: true,
          promotions: {
            create: [
              {
                promotedPage: { connect: utbildningar_behorighet },
              },
              {
                promotedPage: { connect: utbildningar_vagledning },
              },
              {
                promotedPage: { connect: utbildningar_brancher },
              },
            ],
          },
        },
      },
      faqBlock: {
        create: [
          {
            title: 'Vanliga frågor',
            description: '',
            showBlock: true,
            questions: {
              create: [
                {
                  question: 'utbildningar_faq_question1',
                  answer: 'utbildningar_faq_answer1',
                },
                {
                  question: 'utbildningar_faq_question2',
                  answer: 'utbildningar_faq_answer2',
                },
                {
                  question: 'utbildningar_faq_question3',
                  answer: 'utbildningar_faq_answer3',
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      employerPromotionsBlock: true,
    },
  });

  const startsida = await prisma.page.upsert({
    where: { pageName: 'startsida' },
    update: {},
    create: {
      url: '/',
      pageName: 'startsida',
      title: 'Hitta rätt yrke och utbildning i Västernorrland',
      description:
        'Västernorrland växer och du behövs! Här har vi samlat alla yrkesutbildningar som matchar arbetsmarknadens behov. Yrkesutbildning Mitt underlättar för dig som vill studera eller hitta rätt kompetens till din verksamhet',
      showSearchBar: true,
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
      promotionsBlock: {
        create: {
          showBlock: true,
          promotions: {
            create: [
              {
                promotedPage: { connect: utbildningar },
              },
              {
                promotedPage: { connect: utbildningar_vagledning },
              },
              {
                promotedPage: { connect: arbetsgivare },
              },
            ],
          },
        },
      },
      mapBlock: {
        create: [
          {
            showBlock: true,
            title: 'Tillsammans möter vi behoven av kompetens',
            text: 'Vi sätter Västernorrland på kartan. Du som är medborgare, företagare eller utbildningsanordnare behövs för att vi ska fortsätta växa. Kommunerna i Västernorrland kraftsamlar nu tillsammans med er för att möta framtidens behov av kompetens.',
            buttonText: 'Vilka är vi?',
          },
        ],
      },
      importantDatesBlock: {
        create: [
          {
            title: 'Viktiga datum',
            showBlock: true,
            referencedImportantDatesBlockPageUrl: '/viktiga-datum',
            referencedImportantDatesBlockPageName: 'viktiga-datum',
          },
        ],
      },
      faqBlock: {
        create: [
          {
            title: 'Vanliga frågor',
            description: '',
            showBlock: true,
            questions: {
              create: [
                {
                  question: 'startsida_faq_question1',
                  answer: 'startsida_faq_answer1',
                },
                {
                  question: 'startsida_faq_question2',
                  answer: 'startsida_faq_answer2',
                },
                {
                  question: 'startsida_faq_question3',
                  answer: 'startsida_faq_answer3',
                },
              ],
            },
          },
        ],
      },
      logosBlock: {
        create: [
          {
            title: 'Lorem ipsum dolor',
            description:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quod nemo expedita quibusdam laborum atque quasi voluptates laudantium repellendus, porro vitae suscipit veritatis libero necessitatibus incidunt fuga. Placeat, reprehenderit rerum?',
            showBlock: true,
          },
        ],
      },
    },
  });

  await prisma.employerPromotionsBlock.upsert({
    where: { id: 1 },
    update: {
      page: { connect: [{ id: utbildningar.id }, { id: startsida.id }] },
    },
    create: {
      page: { connect: [{ id: utbildningar.id }, { id: startsida.id }] },
      title: 'Utbildningarna som arbetsgivarna efterfrågar',
      showBlock: false,
      employerPromotions: {
        create: [
          {
            title: 'utbildningar_arbetsgivarnautbildningar_title1',
            ingress: 'utbildningar_arbetsgivarnautbildningar_text1',
            searchPhrase: 'utbildningar_arbetsgivarnautbildningar_searchPhrase1',
          },
          {
            title: 'utbildningar_arbetsgivarnautbildningar_title2',
            ingress: 'utbildningar_arbetsgivarnautbildningar_text2',
            searchPhrase: 'utbildningar_arbetsgivarnautbildningar_searchPhrase2',
          },
          {
            title: 'utbildningar_arbetsgivarnautbildningar_title3',
            ingress: 'utbildningar_arbetsgivarnautbildningar_text3',
            searchPhrase: 'utbildningar_arbetsgivarnautbildningar_searchPhrase3',
          },
          {
            title: 'utbildningar_arbetsgivarnautbildningar_title4',
            ingress: 'utbildningar_arbetsgivarnautbildningar_text4',
            searchPhrase: 'utbildningar_arbetsgivarnautbildningar_searchPhrase4',
          },
          {
            title: 'utbildningar_arbetsgivarnautbildningar_title5',
            ingress: 'utbildningar_arbetsgivarnautbildningar_text5',
            searchPhrase: 'utbildningar_arbetsgivarnautbildningar_searchPhrase5',
          },
          {
            title: 'utbildningar_arbetsgivarnautbildningar_title6',
            ingress: 'utbildningar_arbetsgivarnautbildningar_text6',
            searchPhrase: 'utbildningar_arbetsgivarnautbildningar_searchPhrase6',
          },
        ],
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'utbildningsanordnare' },
    update: {},
    create: {
      url: '/utbildningsanordnare',
      pageName: 'utbildningsanordnare',
      title: 'Överblicka utbildningsutbudet',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Exercitation veniam consequat sunt nostrud amet.',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'utbildningar_sok' },
    update: {},
    create: {
      url: '/utbildningar/sok',
      pageName: 'utbildningar_sok',
      title: 'Sugen på att börja studera?',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'utbildningar_sok_jamfor' },
    update: {},
    create: {
      url: '/utbildningar/sok/jamfor',
      pageName: 'utbildningar_sok_jamfor',
      title: 'Jämför utbildningar',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'login' },
    update: {},
    create: {
      url: '/login',
      pageName: 'login',
      title: 'Dags att logga in',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Exercitation veniam consequat sunt nostrud amet.',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'utbildningar_efterfragade_efterfragad' },
    update: {},
    create: {
      url: '/utbildningar/efterfragade/[efterfragad]',
      pageName: 'utbildningar_efterfragade_efterfragad',
      title: '',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'personuppgifter' },
    update: {},
    create: {
      url: '/personuppgifter',
      pageName: 'personuppgifter',
      title: 'Personuppgifter',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'tillganglighetsredogorelse' },
    update: {},
    create: {
      url: '/tillganglighetsredogorelse',
      pageName: 'tillganglighetsredogorelse',
      title: 'Tillgänglighetsredogörelse',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'om-webbplatsen' },
    update: {},
    create: {
      url: '/om-webbplatsen',
      pageName: 'om-webbplatsen',
      title: 'Om webbplatsen',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'kakor' },
    update: {},
    create: {
      url: '/kakor',
      pageName: 'kakor',
      title: 'Kakor',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'kontakta-oss' },
    update: {},
    create: {
      url: '/kontakta-oss',
      pageName: 'kontakta-oss',
      title: 'Kontakta oss',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
      contactFormBlock: {
        create: [
          {
            title: 'Kontaktformulär',
            showBlock: true,
            emails: {
              create: [
                {
                  label: 'Sundsvall',
                  email: 'info@sundsvall.se',
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'viktiga-datum' },
    update: {},
    create: {
      url: '/viktiga-datum',
      pageName: 'viktiga-datum',
      title: 'Viktiga datum',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Exercitation veniam consequat sunt nostrud amet.',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
      importantDatesBlock: {
        create: [
          {
            title: 'Viktiga datum',
            showBlock: true,
            showAll: true,
            showSeeAllButton: false,
            dateCards: {
              create: [
                {
                  date: '2038-01-19',
                  title: 'startsida_viktigadatum_title1',
                  text: 'startsida_viktigadatum_text1',
                },
                {
                  date: '2038-01-19',
                  title: 'startsida_viktigadatum_title2',
                  text: 'startsida_viktigadatum_text2',
                },
                {
                  date: '2038-01-19',
                  title: 'startsida_viktigadatum_title3',
                  text: 'startsida_viktigadatum_text3',
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.page.upsert({
    where: { pageName: '404' },
    update: {},
    create: {
      url: '/404',
      pageName: '404',
      title: 'Ingen sida hittades',
      description: '',
      editRoles: {
        create: [UserRoleEnum.EDITOR].map(role => ({
          role: role,
        })),
      },
    },
  });

  await prisma.footer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      contactTitle: 'Kontakta oss',
      contactText:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
