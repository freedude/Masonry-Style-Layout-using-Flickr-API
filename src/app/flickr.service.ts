import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FlickrService {
    result: Observable<string[]>;
    key = '2a7267cf30a234bd92b15a99afa1de10';
    constructor(private http: HttpClient) {}

    getResult(query: string) {
        const flickrApi = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this
            .key}&tags=${query}&per_page=20&format=json&nojsoncallback=1`;

            return this.http
                .get(flickrApi)
                .pipe(map((res: Response) => res.json()))
                .pipe(map((values: any) => {
                    if (values.stat === 'ok') {
                        return values.photos.photo.map((photo: any) => {
                            return {
                                url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                                title: photo.title,
                                tags: photo.tags,
                                owner: photo.owner,
                                date: photo.date,
                            };
                        });
                    } else {
                        return []; // error handling
                    }
                }));
        } 

}
