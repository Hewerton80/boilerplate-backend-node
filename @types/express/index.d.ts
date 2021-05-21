import { IJwt } from "../../src/app/types/AuthTypes";

declare global{
    namespace Express {
        interface Request {
            user: IJwt
        }
    }
}