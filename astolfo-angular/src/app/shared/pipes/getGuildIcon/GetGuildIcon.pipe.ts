import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'GetGuildIcon',
})
export class GetGuildIconPipe implements PipeTransform {
  transform(value: string | null, args?: string): string {
    return value
      ? `https://cdn.discordapp.com/icons/${args}/${value}.${
          value?.startsWith('a_') ? 'gif' : 'png'
        }`
      : '/assets/discord/discord-default.png';
  }
}
