import { createHeader } from './header/header';
import { createSideMenu } from './side-menu/side-menu';
import { createMain } from './main/main';
import { createFooter } from './footer/footer';
import Textbook from './pages/textbook/textbook';
import ErrorPage from './pages/error-page/error-page';

export const createLayout = (root: HTMLElement) => {
    createHeader(root);
    createSideMenu(root);
    const main = createMain(root) as HTMLElement;
    createFooter(root);

    const errorPage = new ErrorPage('error-page');
    errorPage.render(main);
};
