import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import EStatus from '../../../../models/enums/eStatus';
import EPriority from '../../../../models/enums/ePriority';
import {TaskService} from '../../../../services/task.service';

@Component({
  selector: 'app-action-task',
  templateUrl: './action.component.html',
  styleUrls: []
})
export class ActionComponent {
  private taskId: number;
  inputGroup: FormGroup;
  statusOptArr: Array<any>;
  priorityOptArr: Array<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ActionComponent>,
              private taskService: TaskService) {
    const fetchedData = this.fetchData(data);

    this.createFormControls(fetchedData);
    this.createStatusData();
    this.createPriorityData();
  }

  fetchData(dialogData) {
    const data = dialogData.data && dialogData.data.task;
    this.taskId = data && data.id || -1;

    return {
      title: data && data.title || '',
      status: data && data.status || EStatus.todo,
      priority: data && data.priority || EPriority.low,
      dueDate: data && data.dueDate || new Date().toLocaleDateString(),
      id: this.taskId
    };
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave(): void {
    const formControl = this.inputGroup.controls;
    const isNewTask = this.taskId === -1;
    const objToSave = {
      status: formControl.statusControl.value,
      title: formControl.taskNameControl.value,
      dueDate: new Date(formControl.dueDateControl.value).toLocaleDateString(),
      priority: formControl.priorityControl.value,
      id: isNewTask ? this.taskService.setNewId() : this.taskId
    };

    this.taskService.saveTask(objToSave, isNewTask);
    this.dialogRef.close({task: objToSave, isNew: isNewTask});
  }

  private createFormControls(data): void {
    this.inputGroup = new FormGroup({
      taskNameControl: new FormControl(data.title, [
        Validators.required
      ]),
      dueDateControl: new FormControl(data.dueDate && new Date(data.dueDate), [
        Validators.required
      ]),
      statusControl: new FormControl(data.status, [
        Validators.required
      ]),
      priorityControl: new FormControl(data.priority, [
        Validators.required
      ]),
    });
  }

  private createStatusData(): void {
    this.breakEnumToDropDown('statusOptArr', EStatus);
  }

  private createPriorityData(): void {
    this.breakEnumToDropDown('priorityOptArr', EPriority);
  }

  private breakEnumToDropDown(memberName: string, enumName: any): void {
    this[memberName] = Object.keys(enumName)
      .map(key => {
        const item = enumName[key];
        return {
          viewValue: item,
          value: item
        };
      });
  }
}
