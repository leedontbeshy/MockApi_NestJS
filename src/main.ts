import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for fetch API from any origin
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Mock API server is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   - http://localhost:3000/users`);
  console.log(`   - http://localhost:3000/posts`);
  console.log(`   - http://localhost:3000/products`);
  console.log(`   - http://localhost:3000/comments`);
}
bootstrap();
