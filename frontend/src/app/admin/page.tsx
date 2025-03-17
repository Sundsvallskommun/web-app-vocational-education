import { redirect } from 'next/navigation';

export default function Index() {
  redirect(process.env.ADMIN_URL || '');
}
