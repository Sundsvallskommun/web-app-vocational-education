import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

let adminUser;
try {
  adminUser = JSON.parse(process.env.INIT_ADMIN_USER as string);
} catch (err) {
  throw Error('env INIT_ADMIN_USER not specified');
}

const hashedUser = Object.assign(adminUser, { password: bcrypt.hashSync(adminUser.password, 10) });

const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { username: hashedUser.username },
    update: {},
    create: hashedUser,
  });

  const jobb = await prisma.page.upsert({
    where: { pageName: 'jobb' },
    update: {},
    create: {
      url: '/jobb',
      pageName: 'jobb',
      title: 'Här finns jobben',
      description:
        'Ta reda på vilka branscher som ger jobb nu och x år framåt. Regionen växer och behovet av arbetskraft är stort. Vi behöver dina kompetenser! Utbildning är och kommer att bli en allt viktigare faktor för att få ett jobb',
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
      promotionsBlock: {
        create: {
          showBlock: true,
          promotions: {
            create: [
              {
                promotedPageName: utbildningar_behorighet.pageName,
              },
              {
                promotedPageName: utbildningar_vagledning.pageName,
              },
              {
                promotedPageName: utbildningar_brancher.pageName,
              },
            ],
          },
        },
      },
      employerPromotionsBlock: {
        create: [
          {
            pageName: 'utbildningar',
            title: 'Utbildningarna som arbetsgivarna efterfrågar',
            showBlock: true,
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
        ],
      },
      faqBlock: {
        create: [
          {
            title: 'Vanliga frågor',
            description:
              'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
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

  await prisma.page.upsert({
    where: { pageName: 'startsida' },
    update: {},
    create: {
      url: '/',
      pageName: 'startsida',
      title: 'Hitta rätt yrke och utbildning i Västernorrland',
      description:
        'Västernorrland växer och du behövs! Här har vi samlat alla yrkesutbildningar som matchar arbetsmarknadens behov. Yrkesutbildning Mitt underlättar för dig som vill studera eller hitta rätt kompetens till din verksamhet',
      promotionsBlock: {
        create: {
          showBlock: true,
          promotions: {
            create: [
              {
                promotedPageName: utbildningar.pageName,
              },
              {
                promotedPageName: jobb.pageName,
              },
              {
                promotedPageName: arbetsgivare.pageName,
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
      employerPromotionsBlock: {
        connect: utbildningar.employerPromotionsBlock,
      },
      importantDatesBlock: {
        create: [
          {
            title: 'Viktiga datum',
            showBlock: true,
            dateCards: {
              create: [
                {
                  date: '2038-01-19',
                  title: 'startsida_viktigadatum_title1',
                  text: 'startsida_viktigadatum_text1',
                  url: 'startsida_viktigadatum_url1',
                },
                {
                  date: '2038-01-19',
                  title: 'startsida_viktigadatum_title2',
                  text: 'startsida_viktigadatum_text2',
                  url: 'startsida_viktigadatum_url2',
                },
                {
                  date: '2038-01-19',
                  title: 'startsida_viktigadatum_title3',
                  text: 'startsida_viktigadatum_text3',
                  url: 'startsida_viktigadatum_url3',
                },
              ],
            },
          },
        ],
      },
      faqBlock: {
        create: [
          {
            title: 'Vanliga frågor',
            description:
              'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
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

  await prisma.page.upsert({
    where: { pageName: 'utbildningsanordnare' },
    update: {},
    create: {
      url: '/utbildningsanordnare',
      pageName: 'utbildningsanordnare',
      title: 'Överblicka utbildningsutbudet',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Exercitation veniam consequat sunt nostrud amet.',
    },
  });

  await prisma.page.upsert({
    where: { pageName: 'utbildningsanordnare_kontakta' },
    update: {},
    create: {
      url: '/utbildningsanordnare/kontakta',
      pageName: 'utbildningsanordnare_kontakta',
      title: 'Utbildningsanordnare',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Exercitation veniam consequat sunt nostrud amet.',
      tableBlock: {
        create: [
          {
            showBlock: true,
            headers: {
              create: [
                {
                  name: 'Namn',
                },
                {
                  name: 'Kommun',
                },
                {
                  name: 'Ansvarsområde',
                },
                {
                  name: 'Telefon',
                },
                {
                  name: 'Email',
                },
              ],
            },
          },
        ],
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
