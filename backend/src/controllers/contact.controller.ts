import { ContactFormDto } from '@/dtos/contact.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import ApiService from '@/services/api.service';
import { APP_NAME, MUNICIPALITY_ID } from '@config';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { Body, Controller, HttpCode, Post, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import sanitizeHtml from 'sanitize-html';
import { isDev } from '../utils/env';

const messageHTML = (userData: ContactFormDto, meta: { pathReference: string }) => {
  const lines = sanitizeHtml(userData.message, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .split('\n')
    .map(line => (line ? '<p>' + line + '</p>' : '<br>'))
    .join('');
  const msg = `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kontaktförfrågan ${APP_NAME} - ${userData.name}</title>
</head>
<body>
    <h1>Kontaktförfrågan: ${APP_NAME}</h1>
    <p><strong>Vald kommun:</strong> ${userData.municipality}</p>
    <p><strong>Sidreferens:</strong> ${meta.pathReference}</p>
    <h2>Från</h2>
    <p><strong>Namn:</strong> ${userData.name}</p>
    <p><strong>Email:</strong> ${userData.email}</p>
    <p><strong>Användarens meddelande:</strong></p>
    ${lines}
</body>
</html>
  `;
  return msg.trim();
};

const message = (body: string) => {
  const msg = body;
  return msg.trim();
};

const base64Encode = (str: string) => {
  return Buffer.from(str, 'utf-8').toString('base64');
};

type Municipalities = 'Härnösand' | 'Kramfors' | 'Sollefteå' | 'Sundsvall' | 'Timrå' | 'Ånge' | 'Örnsköldsvik';
const getEmailAdressesfromMunicipality = (municipality: Municipalities) => {
  if (isDev()) return process.env.DEVELOPMENT_MAIL;
  switch (municipality) {
    case 'Härnösand':
      return process.env.MAIL_HARNOSAND;
    case 'Kramfors':
      return process.env.MAIL_KRAMFORS;
    case 'Sollefte\u00E5':
      return process.env.MAIL_SOLLEFTEA;
    case 'Sundsvall':
      return process.env.MAIL_SUNDSVALL;
    case 'Timr\u00E5':
      return process.env.MAIL_TIMRA;
    case '\u00C5nge':
      return process.env.MAIL_ANGE;
    case '\u00D6rnsk\u00F6ldsvik':
      return process.env.MAIL_ORNSKOLDSVIK;
    default:
      return process.env.DEVELOPMENT_MAIL;
  }
};

@Controller()
export class ContactController {
  private apiService = new ApiService();

  @Post('/contact')
  @HttpCode(201)
  @OpenAPI({ summary: 'Send contact form data' })
  @UseBefore(validationMiddleware(ContactFormDto, 'body'))
  async sendContactRequest(@Body() userData: ContactFormDto, @Req() req: RequestWithUser): Promise<any> {
    const pathReference = req.headers['x-referer'];

    const emailString = getEmailAdressesfromMunicipality(userData.municipality as Municipalities);
    if (emailString) {
      const mailAdresses = emailString.split(',');
      mailAdresses.forEach(async email => {
        const sendContactRequest = {
          sender: {
            name: APP_NAME,
            address: 'no-reply@sundsvall.se',
          },
          emailAddress: email,
          subject: `Kontaktförfrågan: ${userData.name}`,
          message: message(userData.message),
          htmlMessage: base64Encode(messageHTML(userData, { pathReference: pathReference as string })),
        };
        const url = `messaging/5.0/${MUNICIPALITY_ID}/email`;
        await this.apiService.post({ url, data: sendContactRequest });
      });
    }

    return { message: 'contact request sent' };
  }
}
