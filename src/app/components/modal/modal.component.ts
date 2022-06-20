import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { liked, addToFav } from 'src/app/icons/fav';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { Movie } from '../../interface/movie';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() public modalConfig!: Movie
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>
  private modalRef!: NgbModalRef

  addFavImg: any;
  likeImg: any;

  constructor(
    private modalService: NgbModal,
    private movies: MovieListComponent
    ) {
      this.addFavImg = addToFav;
      this.likeImg = liked;
    }

  open() {
    this.modalRef = this.modalService.open(this.modalContent)
  }

  close() {
    this.modalRef.close()
  }

  goToIMDB(url: string) {
    window.location.href = url;
  }

  toggleFavorite(id: string, isFavorite: boolean) {
    if (isFavorite) {
      this.modalConfig.isFavorite = false
      this.movies.removeFavorite(id)
    } else {
      this.modalConfig.isFavorite = true
      this.movies.addFavorite(id)
    }
  }
}
