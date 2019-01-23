import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogConfig} from '../dialogs/dialog-config';
import {DeleteTaskComponent} from '../dialogs/task/delete/delete-task.component';
import {ActionComponent} from '../dialogs/task/action/action.component';
import {TaskService} from '../../services/task.service';
import {ITask} from '../../models/interfaces/iTask';
import EPriority from '../../models/enums/ePriority';
import EStatus from '../../models/enums/eStatus';
import {Utils} from '../../commons/utils';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  private taskList: Array<ITask>;
  private filteredTaskList: Array<ITask>;
  private isHideCompletedChecked: boolean;
  displayedColumns: string[];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('hideCompletedTask') hideCompletedTask: any;

  constructor(private dialog: MatDialog,
              private taskService: TaskService) {
    this.taskList = this.taskService.getTasks();
    this.isHideCompletedChecked = this.taskService.isHideCompletedChecked();
    this.displayedColumns = ['title', 'status', 'priority', 'dueDate', 'action'];
    this.dataSource = new MatTableDataSource(this.fetchFilteredTaskList());
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

    // Workaround for @input checked: boolean value on MatCheckbox
    this.hideCompletedTask.checked = this.isHideCompletedChecked;
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
    const itemsPerPage = 10;

    this.dataSource.data = this.fetchFilteredTaskList();

    if (this.taskList.length === itemsPerPage && this.paginator.hasPreviousPage()) {
      this.paginator.previousPage();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCheckboxClick(): void {
    this.isHideCompletedChecked = !this.isHideCompletedChecked;
    this.taskService.setHideCompletedIndicator(this.isHideCompletedChecked);
    this.refreshTable();
  }

  hasDueDatePassed(viewDate: string): boolean {
    return (new Date(viewDate).getTime() + Utils.dayInMili) <= Utils.todaysDate.getTime();
  }

  private fetchFilteredTaskList(): Array<ITask> {
    if (this.isHideCompletedChecked) {
      this.filteredTaskList = this.taskList.filter((task) => task.status !== EStatus.completed);
    } else {
      this.filteredTaskList = [...this.taskList];
    }

    return this.filteredTaskList;
  }
}
