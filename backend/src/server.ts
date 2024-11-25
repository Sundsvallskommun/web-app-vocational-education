import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { EducationsController } from './controllers/educations.controller';
import { UserController } from './controllers/user.controller';
import { AdminPageController } from './controllers/admin/page.controller';
import { AdminLogosBlockLogosController } from './controllers/admin/logos-block-logos.controller';
import { AdminLogosBlockController } from './controllers/admin/logos-block.controller';
import { PageController } from './controllers/page.controller';
import { AdminEmployerPromotionsBlockController } from './controllers/admin/employerpromotions-block.controller';
import { AdminEmployerPromotionsBlockPromotionsController } from './controllers/admin/employerpromotions-block-promotions.controller';
import { AdminFAQBlockController } from './controllers/admin/faq-block.controller';
import { AdminFAQBlockQuestionsController } from './controllers/admin/faq-block-questions.controller';
import { AdminImportantDatesBlockController } from './controllers/admin/importantdates-block.controller';
import { AdminImportantDatesBlockDateCardsController } from './controllers/admin/importantdates-block-datecards.controller';
import { AdminMapBlockController } from './controllers/admin/map-block.controller';
import { AdminPromotionsBlockController } from './controllers/admin/promotions-block.controller';
import { AdminPromotionsBlockPromotionsController } from './controllers/admin/promotions-block-promotions.controller';
import { AdminFooterController } from './controllers/admin/footer.controller';
import { LayoutController } from './controllers/layout.controller';
import { MediaController } from './controllers/media.controller';
import { AdminUserController } from './controllers/admin/user.controller';
import { AdminTableBlockController } from './controllers/admin/table-block.controller';
import { AdminTableBlockHeaderController } from './controllers/admin/table-block-header.controller';
import { AdminTableBlockRowController } from './controllers/admin/table-block-row.controller';
import { AdminTableBlockCellController } from './controllers/admin/table-block-cell.controller';
import { ContactController } from './controllers/contact.controller';
import { EditRolesOnPageController } from './controllers/admin/edit-roles-on-page.controller';
import { HealthController } from '@/controllers/health.controller';
import { BlockController } from '@/controllers/block.controller';
import { AdminContactFormBlockController } from '@/controllers/admin/contact-form-block.controller';
import { AdminContactFormBlockEmailsController } from '@/controllers/admin/contact-form-block-emails.controller';

validateEnv();

const app = new App([
  IndexController,
  HealthController,
  UserController,
  EducationsController,
  PageController,
  BlockController,

  //Admin
  AdminUserController,
  AdminEmployerPromotionsBlockController,
  AdminEmployerPromotionsBlockPromotionsController,
  AdminFAQBlockController,
  AdminFAQBlockQuestionsController,
  AdminImportantDatesBlockController,
  AdminImportantDatesBlockDateCardsController,
  AdminLogosBlockController,
  AdminLogosBlockLogosController,
  AdminMapBlockController,
  AdminPageController,
  AdminLogosBlockController,
  AdminLogosBlockLogosController,
  AdminPromotionsBlockController,
  AdminPromotionsBlockPromotionsController,
  AdminTableBlockController,
  AdminTableBlockHeaderController,
  AdminTableBlockRowController,
  AdminTableBlockCellController,
  AdminContactFormBlockController,
  AdminContactFormBlockEmailsController,

  // Permissions
  EditRolesOnPageController,

  LayoutController,
  AdminFooterController,
  MediaController,
  ContactController,
]);

app.listen();
