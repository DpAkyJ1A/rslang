import AppView from '../view/appView';

export class App {
    private root: HTMLElement;
    private view: AppView;
    constructor(root: HTMLElement) {
        this.root = root;
        this.view = new AppView(root);
    }

    start() {
        this.view.drawStaticInterface();
        this.view.drawCurrentView(); //здесь я передам это метод в качестве колбека в контроллер, пока по дефолту грузит страницу учебника, тк готова
    }
}
