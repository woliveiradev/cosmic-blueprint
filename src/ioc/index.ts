import { Module } from '@nestjs/common';
import { BusModule } from 'core/bus/ioc';

@Module({
  imports: [BusModule],
})
export class RootModule {}
