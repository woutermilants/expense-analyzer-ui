import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import {MatRippleModule} from "@angular/material/core";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,

  ],
  exports: [
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
  ],
})
export class MaterialModule {
}
