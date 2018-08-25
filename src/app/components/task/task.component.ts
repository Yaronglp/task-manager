import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogConfig} from '../dialogs/dialog-config';
import {DeleteTaskComponent} from '../dialogs/task/delete/delete-task.component';
import {ActionComponent} from '../dialogs/task/action/action.component';
import {TaskService} from '../../services/task.service';
import {ITask} from '../../models/interfaces/iTask';
import EPriority from '../../models/enums/ePriority';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  private taskList: Array<ITask>;
  displayedColumns: string[];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private taskService: TaskService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.taskList = this.taskService.getTasks();
    this.dataSource = new MatTableDataSource(this.taskList);
    this.displayedColumns = ['title', 'status', 'priority', 'dueDate', 'action'];
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'dueDate': return new Date(item.dueDate).getTime();
        case 'priority': {
          if (item[property] === EPriority.high) {
            return 1;
          } else if (item[property] === EPriority.medium) {
            return 2;
          } else {
            return 3;
          }
        }
        default: return item[property];
      }
    };
  }

  openDeleteDialog(id): void {
    const dialogRef = this.dialog.open(DeleteTaskComponent, DialogConfig.deleteDialog(id));

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const idx = this.taskList.findIndex(item => item.id === result);

        this.taskList.splice(idx, 1);
        this.refreshTable();
      }
      console.log('Delete dialog was closed');
    });
  }

  openTaskDialog(taskInfo?: ITask): void {
    const option = {
      data: taskInfo ? {
        task: taskInfo
      } : {}
    };

    const dialogRef = this.dialog.open(ActionComponent, DialogConfig.task(option));

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        if (result.isNew) {
          this.taskList.push(result.task);
        } else {
          const idx = this.taskList.findIndex(item => item.id === result.task.id);
          this.taskList[idx] = result.task;
        }

        this.refreshTable();
      }
      console.log('Task dialog was closed');
    });
  }

  refreshTable(): void {
    this.dataSource.data = this.taskList;
    this.changeDetectorRef.detectChanges();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
