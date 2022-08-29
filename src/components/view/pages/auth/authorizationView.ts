import Control from "../../control";
import AuthView from "./auth-view";
import SignInView from "./sign-view";

export default class AuthorizationView extends Control{
    signInView: SignInView;
    authView: AuthView;
    constructor(parentNode: HTMLElement) {
        super(document.body, 'section', 'authorizationView');
        this.authView = new AuthView(this.node);
        this.signInView = new SignInView(null);

        console.log('kek1');
    }
    drawSignInView() {
        this.authView.destroy();
        this.node.append(this.signInView.node);
    }
    drawAuthInView() {
        this.signInView.destroy(); 
        this.node.append(this.authView.node);
    }
}