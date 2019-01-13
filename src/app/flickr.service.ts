import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FlickrService {
    result: Observable<string[]>;
    key = 'a62faaa60f5e3f6408d527d3c3a2d98a';
    
    constructor(private http: HttpClient) {}
   

    getResult(query: string) {
        const searchApi = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this
            .key}&tags=${query}&extras=owner_name,date_taken,tags&per_page=20&safe_search=1&format=json&nojsoncallback=1`;

        console.log('searchApi' + searchApi);
            return this.http
                .get(searchApi)
                .pipe(map((values: any) => {
                    console.log('PHOTO SEARCH RESULTS' + JSON.stringify(values));
                    if (values.stat === 'ok') {
                        return values.photos.photo.map((photo: any) => {
                            
                            return {
                                url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                                title: photo.title,
                                owner: photo.ownername,
                                id: photo.id, 
                                dateTaken: photo.datetaken,
                                tags: photo.tags,
                            };
    
                            
                        });
                        
                    } else {
                        window.alert('Sorry, there was an error retrieving your photos, please try another search term');
                        
                    }
                }));
        } 


}
