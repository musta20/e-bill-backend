import { Bill } from "../entits/Bill";
import { Product } from "../entits/Product";
import { User } from "../entits/User";
import { DataSourceOptions } from "typeorm/data-source";
import config from "../../config"

 const  typeormconfig : DataSourceOptions= {
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities:[Bill, User, Product],
    synchronize:true,
    logging:config.DB_LOGGING
} 

export default typeormconfig;
