import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AuthService } from 'src/app/shared/services/authServices/authService.service';
import { SnackbarServices } from 'src/app/shared/services/snackbar/snackbar.service';
import { ConfirmationDialog } from '../../layouts/confirmation-dialog/confirmation-dialog.component';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { UserListService } from 'src/app/shared/services/user_list_service/user-list.service';
import { UserList } from 'src/app/shared/models/UserList';
import { TaskService } from 'src/app/shared/services/taskService/task.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  mode = new FormControl('side' as MatDrawerMode);
  hasBackdrop = new FormControl(null as null | boolean);
  position = new FormControl('start' as 'start' | 'end');

  username!: string;
  user_id: any;
  UserLists!: UserList[];
  current_id: any;
  userListID: any;
  currentList: any;
  nav_open: any;
  private currentIdSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private snackBarService: SnackbarServices,
    public dialog: MatDialog,
    public router: Router,
    private userListService: UserListService,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.UserLists = <UserList[]>[];
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
        if (result.matches) {
          // Mobile view
          this.mode.setValue('over');
          this.hasBackdrop.setValue(true); // Enable backdrop for mobile view
          this.position.setValue('start');
          this.nav_open = false; // Initially closed in mobile view
        } else {
          // Web view
          this.mode.setValue('side');
          this.hasBackdrop.setValue(false); // Disable backdrop for web view
          this.position.setValue('start');
          this.nav_open = true; // Initially open in web view
        }
      });

    this.currentIdSubscription = this.taskService.currentId$.subscribe(
      (id: any) => {
        this.current_id = id;
      }
    );

    const tokenDetailsString = localStorage.getItem('tokenDetails');
    if (tokenDetailsString !== null) {
      const tokenDetails = JSON.parse(tokenDetailsString);
      this.username = tokenDetails.username;
      this.user_id = tokenDetails.user_id;
    }
    this.getUserLists();
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.currentIdSubscription.unsubscribe();
  }

  getUserLists() {
    this.userListService.getUserLists(this.user_id).subscribe({
      next: (resp: any) => {
        this.UserLists = resp.data;

        const listVal = this.UserLists.find(
          (v) => v.list_id == this.current_id
        );
        if (listVal) {
          this.userListID = this.UserLists.indexOf(listVal);
          this.currentList = listVal.list_name;
        }
      },
      error: (error: any) => {
        this.snackBarService.errorsSnack(error);
      },
    });
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: this.mode.getRawValue() == 'over' ? '130vw' : '25vw',
      data: {
        message: 'Are you sure you want to log out?',
        cancelButtonLabel: 'No Thanks',
        confirmButtonLabel: 'Ok',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'OK') {
        this._authService.logout().subscribe(
          (resp: any) => {
            this.snackBarService.warningSnack('Log out successfully');
            this.taskService.setCurrentID(null);
            this.router.navigate(['/login']);
          },
          (error: any) => {
            this.snackBarService.errorsSnack(error);
          }
        );
      }
    });
  }

  newList() {
    const dialogRef = this.dialog.open(CreateListComponent, {
      width: this.mode.getRawValue() == 'over' ? '130vw' : '25vw',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      let ul = new UserList();
      ul.list_name = result;
      if (result != undefined && result != null && result != '') {
        this.userListService.saveUserList(ul, this.user_id).subscribe({
          next: (resp: any) => {
            // this.snackBarService.successSnack('list created successfully');
            this.getUserLists();
          },
          error: (error: any) => {
            this.snackBarService.errorsSnack(error.error.message);
          },
        });
      }
    });
  }

  ListClick(id: any) {
    let list = this.UserLists[id];
    this.currentList = list.list_name;
    this.userListID = id;
    this.router.navigate(['main/', list.list_id]);
  }

  editList(event: Event) {
    event.stopPropagation();
    const updateList = this.UserLists.find((v) => v.list_id == this.current_id);
    if (updateList) {
      const dialogRef = this.dialog.open(CreateListComponent, {
        width: this.mode.getRawValue() == 'over' ? '130vw' : '25vw',
        data: {
          listName: updateList.list_name,
          pageName: 'Edit ',
        },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result != undefined && result != null && result != '') {
          updateList.list_name = result;
          this.userListService.updateList(updateList, this.user_id).subscribe({
            next: (resp: any) => {
              this.snackBarService.successSnack('list updated successfully');
              this.getUserLists();
            },
            error: (error: any) => {
              this.snackBarService.errorsSnack(error.error.message);
            },
          });
        }
      });
    }
  }

  deleteList(event: Event) {
    event.stopPropagation();
    const list = this.UserLists[this.userListID];
    console.log(list);

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: this.mode.getRawValue() == 'over' ? '130vw' : '25vw',
      data: {
        message: 'Are you sure you want to delete this list and related task?',
        cancelButtonLabel: 'Cancel',
        confirmButtonLabel: 'Yes',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 'Ok'){
        this.userListService.deleteList(list.list_id).subscribe({
          next: (resp: any) => {
            console.log(resp);
            this.currentList = null;
  
            this.userListService.getUserLists(this.user_id).subscribe({
              next: (resp: any) => {
                this.UserLists = resp.data;
                this.router.navigate(['/main/home']);
              },
              error: (error: any) => {
                this.snackBarService.errorsSnack(error);
              },
            });
          },
          error: (err: any) => {},
        });
      }
    });
  }

  home() {
    this.current_id = null;
    this.currentList = null;
    this.userListID = null;
    this.taskService.setCurrentID(null);
    this.router.navigate(['/main/home']);
  }
}

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.html',
  styleUrls: ['./main-component.component.scss'],
})
export class CreateListComponent {
  name!: string;
  pageName!: string;
  constructor(
    public dialogRef: MatDialogRef<CreateListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pageName = data?.pageName + data?.listName;
    this.name = data?.listName;
  }

  close(): void {
    this.dialogRef.close();
  }
}
