const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true
}));

let notes = [
  {
    id: 1,
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
  },
  {
    id: 2,
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
  }
];

router.get('/notes', async (ctx) => {
  ctx.response.body = notes;
});

router.post('/notes', async (ctx) => {
  const note = ctx.request.body;

  notes.push(note);

  ctx.response.status = 200;
  ctx.response.body = {status: 'OK'};
});

router.delete('/notes/:id', async (ctx) => {  

  const {id} = ctx.params; 

  notes = notes.filter(note => note.id !== +id);

  ctx.response.status = 200;
  ctx.response.body = {status: 'OK'};
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
const server = http.createServer(app.callback());
server.listen(port);
