import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/shared/models/Task';
import { SnackbarServices } from 'src/app/shared/services/snackbar/snackbar.service';
import { TaskService } from 'src/app/shared/services/taskService/task.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ConfirmationDialog } from '../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  tasks!: Task[];
  show: boolean = false;
  list_id!: Number;
  mode!: boolean;

  constructor(
    private snackBarService: SnackbarServices,
    public dialog: MatDialog,
    public router: Router,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
        if (result.matches) {
          // Mobile view
          this.mode = true;
        } else {
          // Web view
          this.mode = false;
        }
      });

    this.route.params.subscribe((params) => {
      this.list_id = params['id'];
      if (this.list_id != undefined && this.list_id != null) {
        // Set the current ID in TaskService
        this.taskService.setCurrentID(this.list_id);
        // Fetch tasks for the current ID
        this.getTask(this.list_id);
      }
    });
  }

  getTask(list_id: any) {
    this.taskService.getTasks(list_id).subscribe({
      next: (resp: any) => {
        this.tasks = resp.data;
        if (resp.data.length > 0) {
          this.show = true;
        } else {
          this.show = false;
        }
      },
      error: (error: any) => {
        this.snackBarService.errorsSnack(error.error.message);
      },
    });
  }

  newTask() {
    if (
      this.list_id != 0 &&
      this.list_id != undefined &&
      this.list_id != null
    ) {
      const dialogRef = this.dialog.open(CreateTaskComponent, {
        width: this.mode ? '130vw' : '25vw',
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        let task = new Task();
        task.taskName = result;
        if (result != undefined && result != null && result != '') {
          this.taskService.saveTask(task, this.list_id).subscribe({
            next: (resp: any) => {
              // this.snackBarService.successSnack('task added successfully');
              this.getTask(this.list_id);
            },
            error: (err: any) => {
              this.snackBarService.errorsSnack(err.error.message);
            },
          });
        }
      });
    } else {
      this.snackBarService.warningSnack('please select a list first');
    }
  }

  editTask(event: Event, taskId: any, taskName: any) {
    event.stopPropagation();
    console.log(this.list_id);
    if (
      this.list_id != 0 &&
      this.list_id != undefined &&
      this.list_id != null
    ) {
      const dialogRef = this.dialog.open(CreateTaskComponent, {
        width: this.mode ? '130vw' : '25vw',
        data: { pageName: 'Edit   ', taskName: taskName },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result != undefined && result != null && result != '') {
          console.log(result);
          const update_task = this.tasks.find((v) => v.taskId == taskId);
          if (update_task != undefined) {
            update_task.taskName = result;
            this.taskService.updateTask(update_task, this.list_id).subscribe({
              next: (resp: any) => {
                this.getTask(this.list_id);
              },
              error: (err: any) => {},
            });
          }
        }
      });
    } else {
      this.snackBarService.warningSnack('please select a list first');
    }
  }

  deleteTask(event: Event, taskId: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: this.mode ? '130vw' : '25vw',
      data: {
        message: 'Are you sure you want to delete this task?',
        cancelButtonLabel: 'Cancel',
        confirmButtonLabel: 'Yes',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'Ok') {
        this.taskService.deleteTask(taskId).subscribe({
          next: (resp: any) => {
            this.getTask(this.list_id);
          },
          error: (err: any) => {},
          complete: () => {},
        });
      }
    });
  }

  toggleStatus(id: any) {
    const task = this.tasks[id];
    task.status = !task.status;

    this.taskService.updateTask(task, this.list_id).subscribe({
      next: (resp: any) => {},
      error: (err: any) => {},
    });
  }
}

// dialog component
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.html',
  styleUrls: ['./task.component.scss'],
})
export class CreateTaskComponent {
  name!: string;
  pageName: string;
  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pageName = data?.pageName + data?.taskName;
    this.name = data?.taskName;
  }

  close(): void {
    this.dialogRef.close();
  }
}
