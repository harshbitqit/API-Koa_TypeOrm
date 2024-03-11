import * as bodyParser from 'koa-bodyparser';
import * as Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
import movieController from "../movie/movie.controller"

const app:Koa = new Koa();

app.use(bodyParser());

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error:error.message }; 
    ctx.app.emit('error', error, ctx as any );
  }
});
console.log("here")
// Initial route
// Initial route
// app.use(async (ctx:Koa.Context) => {
//   ctx.body = 'Hello world';
// });

  
    app.use(movieController.routes());
    app.use(movieController.allowedMethods())


// Application error logging.
app.on('error', console.error);

export default app;