import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'spacing'
})
export class SpacingPipe implements PipeTransform {
  transform(value: any) {
    if (value?.toString().length != null) {
      return value.toString().replace(/(.{3})/g, '$1 ').trim();
    }
    return value;
  }
}
