import { IJwt } from "../../src/app/types/AuthTypes";

declare global {
    namespace Express {
        interface Request {
            user: IJwt
        }
    }
}

declare global {
    namespace SocketIo {
        interface Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> {
            user: IJwt
        }
    }
}