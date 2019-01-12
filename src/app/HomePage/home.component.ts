import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlickrService } from '../flickr.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-search-flickr',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    searchControl = new FormControl();
    photos: Object;
    tags: Object;

    constructor(private flickrService: FlickrService) { }

    ngOnInit() {
        
        this.searchControl.valueChanges
            .pipe(debounceTime(400))
            .pipe(distinctUntilChanged())
            .pipe(switchMap((search: string) => this.flickrService.getResult(search)))
            // .pipe(switchMap(() => this.flickrService.getTags()))
            .subscribe(value => {
                this.photos = value;
                console.log('SEARCHES' + JSON.stringify(value));

                this.flickrService.getTags().subscribe(tags => {
                    this.tags = tags;
                    console.log('TAGS' + JSON.stringify(tags));
                });
            }
            
            );

            

    }

}
