import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  });

  class CustomIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: ServerOptions): any {
      const server = super.createIOServer(port, {
        ...options,
        cors: {
          origin: "http://localhost:5173",
          methods: ["GET", "POST"],
          credentials: true,
        },
      });
      return server;
    }
  }

  app.useWebSocketAdapter(new CustomIoAdapter(app));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
