import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://franciscocsar:m87KxgoURKMLTgP2@database.geztvc1.mongodb.net/?retryWrites=true&w=majority',
    ),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
