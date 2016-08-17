import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {FirebaseListObservable, FirebaseDatabase} from 'angularfire2';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  tasks: FirebaseListObservable<any>;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private database: FirebaseDatabase
  ) {
    this.tasks = this.database.list('/tasks')
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
            this.tasks.push({
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
    setTimeout(()=>{
      this.tasks.update( task.$key,{
        title: task.title,
        done: task.done
      });
    },1);
  }

  removeTask( task ){
    this.tasks.remove( task );
  }
}
