import { Pipe, PipeTransform } from '@angular/core';
import { User } from "./user";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<User>, searchStr: string): Array<User> {
    if (!value) { return value; }

    return value.filter(user => {
      return user.name.includes(searchStr.toLowerCase()) || user.score.toString().includes(searchStr.toLowerCase())
    })
  }

}