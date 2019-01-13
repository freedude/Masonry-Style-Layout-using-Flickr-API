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

    public page = 1;
    public searchTerm;

    constructor(private flickrService: FlickrService) { }

    ngOnInit() {
        // Images on first load
        this.flickrService.getResult('ireland', this.page).subscribe(value => {
            this.photos = value;
        });

        // Images on Search Bar entry
        this.searchControl.valueChanges
            .pipe(debounceTime(400))
            .pipe(distinctUntilChanged())
            .pipe(switchMap((search: string) => this.flickrService.getResult(search, this.page)))
            .subscribe(value => {
                this.photos = value;
                
            });
    }

    // Increase number of pages for infinite scrolling
    onScroll() {
        
        this.page++;
        this.searchTerm = this.searchControl.value;
       
        if (this.searchTerm === null) {
            this.searchTerm = 'ireland';  
        }

        this.flickrService.getResult(this.searchTerm, this.page).subscribe(value => {
            this.photos = value;
        });

    }


}
