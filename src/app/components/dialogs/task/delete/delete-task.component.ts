import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TaskService} from '../../../../services/task.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteTaskComponent>,
              private taskService: TaskService) { }

  ngOnInit() {
  }

  @HostListener('keydown.enter', ['data.id'])
  onEnter(taskId: number) {
    this.onDelete(taskId);
  }

  onDelete(id) {
    this.taskService.deleteTask(id);
    this.dialogRef.close(id);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
