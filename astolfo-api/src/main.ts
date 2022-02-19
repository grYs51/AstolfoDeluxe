import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { getRepository } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';
import Session from './utils/typeorm/entities/Session';
import { entities } from './utils/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session);

  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
  });
  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Astolfo Swagger')
    .setDescription(
      "The Astolfo Swagger! \n \n Tbh... I didn't expected it to be this easy. Like I first thought it would take like a long time to get this working but it litterally took me a couple of minutes. \n \n Anyway... Eris cute",
    )
    .setVersion('0.1')
    .addTag('Astolfo')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: entities,
  });

  SwaggerModule.setup('api/swagger', app, document);

  try {
    await app.listen(process.env.PORT);
    console.log(`Running on PORT ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
