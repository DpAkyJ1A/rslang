import { ISettings, IStatistics, IUser, IUserWord } from "./interfaces";

export default class ApiService {
    baseUrl = 'https://rs-lang-team-156.herokuapp.com';

    async getWords(page: number, group: number) {
        return await fetch(`${this.baseUrl}/words?page=${page}&group=${group}`)
        .then(res => res.json());    
    }

    async getWordsById(id: string){
        return await fetch(`${this.baseUrl}/words/${id}`)
        .then(res => res.json()); 
    }

    async createUser(user: IUser) {
        return await fetch(`${this.baseUrl}/users`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })  
    }

    async signInUser(login: { email: string, password: string }) {
        return await fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async getNewToken(id: string, refreshtoken: string) {
        return await fetch(`${this.baseUrl}/users/${id}/tokens`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${refreshtoken}`,
            },
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async getUserById(id: string, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}`,{
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async updateUser(id: string, user: IUser, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(user)
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async deleteUser(id: string, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            },
            method: 'DELETE',
            })
    }

    async getUserWords(id: string, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}/words`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async createUserWord(id: string, wordId: string, userWord: IUserWord, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}/words/${wordId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userWord)
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async getUserWordById(id: string, wordId: string, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}/words/${wordId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async updateUserWord(id: string, userWord: IUserWord, wordId: string, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}/words/${wordId}`, {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userWord)
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async deleteUserWord(id: string, wordId: string, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}/words/${wordId}`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            },
            method: 'DELETE',
            });
    }

    // в методе нет фильтрации
    async getAggregatedWords(id: string, group: number, token: string, page?: number, wordsPerPage?: number) {
        return await fetch(`${this.baseUrl}/users/${id}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async getAggregatedWordsById(id: string, wordId: string, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}/aggregatedWords/${wordId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async putUserStatistics(id: string, token: string, statistics: IStatistics) {
        return await fetch(`${this.baseUrl}/users/${id}/statistics`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(statistics)
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async getUserStatistics(id: string, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}/statistics`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async putUserSettings(id: string, token: string, settings: ISettings) {
        return await fetch(`${this.baseUrl}/users/${id}/settings`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

    async getUserSettings(id: string, token: string) {
        return await fetch(`${this.baseUrl}/users/${id}/settings`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            })
            .then(res => {
                if(res.status !== 200) throw Error(`${res.status}`);
                return res.json();
            })
    }

}