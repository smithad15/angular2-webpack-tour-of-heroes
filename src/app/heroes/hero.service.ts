import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero.model';

@Injectable()
export class HeroService {
  private heroesUrl: string;

  constructor(private http: Http) {
    this.heroesUrl = 'app/heroes';
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => {
        return heroes.filter(hero => hero.id === id)[0];
      });
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    } else {
      return this.post(hero);
    }
  }

  delete(hero: Hero): Promise<void> {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .delete(url, { headers })
      .toPromise()
      .then(() => undefined)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), { headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private put(hero: Hero): Promise<Hero> {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), { headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

}
