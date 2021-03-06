import { trigger, transition, style, animate } from '@angular/animations';
import { ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Comentario } from 'src/app/models/comment';
import { CommentService } from 'src/app/service/comment.service';
import { Header } from 'src/app/utils/header';

@Component({
  selector: 'app-admin-services-comments',
  templateUrl: './admin-services-comments.component.html',
  styleUrls: ['./admin-services-comments.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AdminServicesCommentsComponent implements OnInit {
  @ViewChildren('closebutton') closebutton;

  header: Header[] = [{ title: "Id", id: "id" }, { title: "Comentario", id: "comment" }];

  comments: Comentario[] = [];
  comment: Comentario;

  searchText;
  isUpdateFail: boolean;
  isDeleteFail: boolean;
  submitted: boolean = false;
  submittedDelete: boolean = false;

  //Pagination
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;
  columnName: string = "";
  order: string = "asc";

  constructor(private commentService: CommentService, public dialogo: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.orderCommentList();

  }

  // REVISAR EL DATE
  onSubmit(comment, id, date): void {

    this.submitted = true;
    this.iterateChildrenButton();



    this.dialogo.open(ConfirmDialogComponent, {
      data: `¿Estás seguro de esta acción?`
    })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.comment = new Comentario(id, date, comment);

          this.commentService.putComment(this.comment, id).subscribe(
            data => {
              this.isUpdateFail = true;
              this.comment = data;
              this.toastr.success('Comentario actualizado', 'Actualización', {
                timeOut: 3000,
              });
              this.orderCommentList();
            }, err => {
              this.isUpdateFail = false;
              this.toastr.error('El comentario no se ha podido actualizar', 'Actualización', {
                timeOut: 3000,
              });
            });

          this.submitted = false;

        }
      })

  }

  deleteComment(id): void {

    this.submittedDelete = true;
    this.iterateChildrenButton();

    this.dialogo.open(ConfirmDialogComponent, {
      data: `¿Estás seguro de esta acción?`
    })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          this.commentService.deleteComment(id).subscribe(
            data => {
              this.isDeleteFail = true;
              this.toastr.success('Comentario borrado', 'Actualización', {
                timeOut: 3000,
              });
              this.orderCommentList();
            }, err => {
              this.isDeleteFail = false;
              this.toastr.error('El comentario no se ha podido borrado', 'Actualización', {
                timeOut: 3000,
              });
            });

          this.submittedDelete = false;

        }
      })

  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.orderCommentList();
  }

  orderCommentList(): void {
    this.commentService.getCommentListPaginatedSorted(this.thePageNumber - 1,
      this.thePageSize, this.columnName, this.order).subscribe(this.processResult());
  }

  updateOrderList(columnName: string) {

    if (this.columnName == columnName) {
      this.toggleOrder();
    }

    this.columnName = columnName;

    console.log(this.columnName);
    //this.thePageNumber = 1;
    this.orderCommentList();
  }

  toggleOrder() {
    if (this.order == "desc") {
      this.order = "asc";
    } else {
      this.order = "desc";
    }
  }

  processResult() {
    return data => {
      this.comments = data._embedded.comment;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements
    };
  }

  iterateChildrenButton() {
    this.closebutton.forEach(element => {
      element.nativeElement.click();
    });
  }

}

