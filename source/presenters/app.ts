import 'dotenv/config';
import { HttpServiceExpress } from './infra/HttpServiceExpress';

const PORT: string = process.env.PORT || '5000';

const app = new HttpServiceExpress();

app.init(PORT);



