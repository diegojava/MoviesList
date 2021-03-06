import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/interface/movie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { liked, addToFav } from 'src/app/icons/fav';

import { mock } from 'src/app/movie-list-mock';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {

  moviesList!: any[];
  movieListCopy!: any[];

  movie!: Movie;

  movieArray!: any;
  
  favoriteTag: string = 'View Favorites'
  favoriteFlag: boolean = false

  addFavImg: any;
  likeImg: any;

  movieLimit: number = 10;

  modalConfig!: Movie

  @ViewChild('modal') private modalComponent!: ModalComponent


  constructor(
    private http: HttpClient
  ) {
    this.addFavImg = addToFav;
    this.likeImg = liked;
  }

  ngOnInit(): void {
    this.getAllMovies();
    //this.moviesList = mock;
    this.movieArray = JSON.parse(localStorage.getItem("favorite-list") || '[]');
  }

  async getAllMovies() {
    this.moviesList = [];
    await this.http.get<any>(environment.apiUrl).subscribe((res) => {
      res.slice(0, this.movieLimit).map((movie: Movie) => {
        this.movie = {
          id: movie.id,
          name: movie.name,
          image: movie.image.original,
          genres: movie.genres,
          premiered: this.getOnlyYear(movie.premiered),
          ended: this.getOnlyYear(movie.ended),
          rating: movie.rating,
          summary: movie.summary,
          //isFavorite: false,
          officialSite: movie.officialSite
        }
        this.moviesList.push(this.movie)
      })
      this.readFavs()
      //console.log(this.moviesList)
      this.movieListCopy = this.moviesList
      return this.moviesList;
    })
  }

  readFavs() {
    for (let [value, key] of Object.entries(this.moviesList)) {
      if (this.movieArray.includes(key.id)) {
        key.isFavorite = true;
      } else {
        key.isFavorite = false
      }
    }
  }

  addFavorite(id: string) {
    this.movieArray.push(id)
    localStorage.setItem('favorite-list', JSON.stringify(this.movieArray))
    this.readFavs()
  }

  removeFavorite(id: string) {
    let toDelete;
    toDelete = this.movieArray.indexOf(id)
    this.movieArray.splice(toDelete, 1)
    localStorage.setItem('favorite-list', JSON.stringify(this.movieArray))
    this.readFavs()
  }

  getOnlyYear(date?: string) {
    let year = date?.split('-')[0]
    return year  || 'Current';
  }

  async openModal(movie: Movie) {
    this.modalConfig = { 
      id: movie.id,
      name: movie.name, 
      summary: movie.summary, 
      genres: movie.genres,
      rating: movie.rating.average / 2,
      premiered: movie.premiered,
      ended: movie.ended,
      image: movie.image,
      officialSite: movie.officialSite, 
      isFavorite: movie.isFavorite || false 
    };
    return await this.modalComponent.open()
  }

  filterSearch(e: any) {
    const search = e.target.value
    this.moviesList = this.movieListCopy.filter(({ name }: Movie) => {
      return name.toLowerCase().includes(search.toLowerCase())
    })
  }

  filterFavorites() {
    if (this.favoriteFlag) {
      this.favoriteFlag= false
      this.favoriteTag = 'View Favorites'
      this.moviesList = this.movieListCopy.filter(({ isFavorite }: Movie) => {
        return isFavorite || !isFavorite
      })
    } 
    else {
      this.favoriteFlag = true
      this.favoriteTag = 'View All'
      this.moviesList = this.movieListCopy?.filter(({ isFavorite }: Movie) => {   
        return isFavorite
      })
    }
  }

}
