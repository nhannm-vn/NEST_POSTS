import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './routes/posts/posts.module'
import { SharedModule } from './shared/shared.module'
import { AuthModule } from './routes/auth/auth.module'

@Module({
  imports: [PostsModule, SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
