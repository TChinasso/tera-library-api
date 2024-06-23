import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  return app
}
const app = bootstrap();
console.log(process.env.MONGODB_URI)
 export default app