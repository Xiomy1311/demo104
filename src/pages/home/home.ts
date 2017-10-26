import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.tasksRef = this.database.list('tasks');
    this.tasks = this.tasksRef.valueChanges();
  }

  createTask(){
    let newTaskModal = this.alertCtrl.create({
      title: 'New Task',
      message: "Enter a title for your new task",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.tasksRef.push({
              title: data.title,
              done: false
            });
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }

  updateTask( task ){
    this.tasksRef.update( task.$key,{
      title: task.title,
      done: !task.done
    });
  }

  removeTask( task ){
    this.tasksRef.remove( task.$key );
  }
}
