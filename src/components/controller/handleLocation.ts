import { routes } from '../model/routes';
export const handleLocation = async () => {
    const path: string = window.location.pathname;
    const route = routes[path] || routes['404'];
    const html = await fetch(route).then((data) => data.text());
    document.querySelector('.main')!.innerHTML = html;
};
