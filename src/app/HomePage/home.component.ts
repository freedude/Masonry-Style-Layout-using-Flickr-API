import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { FlickrService } from '../flickr.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-search-flickr',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    searchBar = new FormControl();
    model: Observable<string>;
    photos: Object;

    constructor(private formBuilder: FormBuilder, private flickrService: FlickrService) { }

    

    ngOnInit() {
        this.searchBar.valueChanges
            .pipe(debounceTime(400))
            .pipe(distinctUntilChanged())
            .pipe(switchMap((search: string) => this.flickrService.getResult(search)))
            .subscribe(value => {
                this.photos = value;
            });

    }

}
