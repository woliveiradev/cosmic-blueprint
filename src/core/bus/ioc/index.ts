import { Global, Module } from '@nestjs/common';
import { BusCoreProxy } from '../core/core-proxy.bus';
import { BusCore } from '../core/core.bus';
import { BUS_CORE, EVENT_BUS } from './tokens';

@Global()
@Module({
  providers: [
    {
      provide: BUS_CORE,
      useClass: BusCore,
    },
    {
      provide: EVENT_BUS,
      useFactory: (busCore) => {
        return new BusCoreProxy(busCore);
      },
      inject: [BUS_CORE],
    },
  ],
  exports: [EVENT_BUS],
})
export class BusModule {}
