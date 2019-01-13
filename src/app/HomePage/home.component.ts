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

    public searchControl = new FormControl();
    public photos: Object;
    public edited = false;

    constructor(private flickrService: FlickrService) { }

    onScroll() {
        this.edited = true;
    }

    ngOnInit() {

        // Images on first load
        this.flickrService.getResult('ireland').subscribe(value => {
            this.photos = value;
        });

        // Images on Search Bar entry
        this.searchControl.valueChanges
            .pipe(debounceTime(400))
            .pipe(distinctUntilChanged())
            .pipe(switchMap((search: string) => this.flickrService.getResult(search)))
            .subscribe(value => {
                this.photos = value;
                
            }

            );


    }

}
