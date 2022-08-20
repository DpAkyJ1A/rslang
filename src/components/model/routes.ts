interface IRoutes {
    404: string;
    [key: string]: string;
}

const routes: IRoutes = {
    404: '',
    '/главная': '',
    '/учебник': '',
    '/словарь': '',
    '/игры': '',
    '/статистика': '',
    '/команда': '',
};

export { IRoutes, routes };
