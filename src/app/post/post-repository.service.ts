import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PostRepository {

  constructor(private http: HttpClient) {}

  getList() {
    const url = 'http://127.0.0.1:8000/api/posts';

    return this.http.get(url);
  }
}
