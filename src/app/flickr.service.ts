import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FlickrService {
    result: Observable<string[]>;
    key = '2a7267cf30a234bd92b15a99afa1de10';
    tagsApi: any;
    testApi: any;

    constructor(private http: HttpClient) {}
   
    

    getResult(query: string) {
        const searchApi = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this
            .key}&tags=${query}&per_page=20&format=json&nojsoncallback=1`;

            return this.http
                .get(searchApi)
                .pipe(map((values: any) => {
                    console.log('PHOTO SEARCH RESULTS' + JSON.stringify(values));
                    if (values.stat === 'ok') {
                        return values.photos.photo.map((photo: any) => {

                            this.tagsApi = `https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=${this
                                .key}&photo_id=${photo.id}`;

                            this.testApi = `https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=e323e04846805cdcaca5e8cfbd341967&photo_id=32840694058&format=json&nojsoncallback=1&auth_token=72157675512782307-86ea4d2869c966f6&api_sig=f8573883d16049641e51d7d8d996c06a`;
                            
                            return {
                                url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                                title: photo.title,
                                owner: photo.owner,
                                id: photo.id,  
                            };
    
                            
                        });
                        
                    } else {
                        return []; // error handling
                    }
                }));
        } 

    getTags() {
       
        return this.http
            .get(this.testApi)
            .pipe(map((values: any) => {
                console.log('TAGS SEARCH RESULTS' + JSON.stringify(values));
                if (values.stat === 'ok') {
                    return values.photo.tags.tag.map((photo: any) => {
                
                        return {
                            authorname: photo.title,
                            raw: photo.owner,                     
                        };

                    });
                } else {
                    return []; // error handling
                }
            }));
    } 

}
