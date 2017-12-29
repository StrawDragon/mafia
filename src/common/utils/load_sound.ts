import { Observable } from 'rxjs';
import { Sound } from './sound';

export const loadSound = (url: string): Observable<Sound> => Observable
  .ajax({url, responseType: 'arraybuffer'})
  .map(result => new Sound(result.response))
  .switchMap(sound => Observable
    .fromPromise(sound.init())
    .mapTo(sound)
  );