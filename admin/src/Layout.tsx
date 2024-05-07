import { Layout as RALayout } from 'react-admin';
import AppBar from './AppBar';
import { CustomMenu } from './Menu';

const Layout = (props: any) => <RALayout {...props} menu={CustomMenu} appBar={AppBar} />;

export default Layout;
