import { NgModule } from '@angular/core';
import { NumWordPipe } from './pipes/num-word.pipe';
import { LocalePipe } from './pipes/locale.pipe';


@NgModule({
  declarations: [ NumWordPipe, LocalePipe],
  exports: [LocalePipe, NumWordPipe]
})
export class SharedModule {}
