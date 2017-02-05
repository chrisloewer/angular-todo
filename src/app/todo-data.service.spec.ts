/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoDataService } from './todo-data.service';
import {Todo} from "./todo";

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  describe('#getAllTodos()', () => {
    it('should return empty array by default', inject ([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject ([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'One', complete: false});
      let todo2 = new Todo({title: 'Two', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#save(todo)', () => {
    it('should increment id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'One', complete: false});
      let todo2 = new Todo({title: 'Two', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));
  });

  describe('#deleteTodoById(id)', () => {
    it('should remove todo with matching id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'One', complete: false});
      let todo2 = new Todo({title: 'Two', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not remove todo if no matching id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'One', complete: false});
      let todo2 = new Todo({title: 'Two', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#updateTodoById(id, values)', () => {
    it('should return todo with updated values', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'One', complete: false});
      service.addTodo(todo1);
      let updateTodo = service.updateTodoById(1, { title: 'updated' });
      expect(updateTodo.title).toEqual('updated');
    }));

    it('should return null if todo is not found', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'One', complete: false});
      service.addTodo(todo1);
      let updateTodo = service.updateTodoById(2, { title: 'updated' });
      expect(updateTodo).toEqual(null);
    }));
  });

  describe('#toggleTodoComplete(todo)', () => {
    it('Should change the completed flag', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'One', complete: false});
      service.addTodo(todo1);
      let updateTodo = service.toggleTodoComplete(todo1);
      expect(updateTodo.complete).toEqual(true);
    }));
  });

});
