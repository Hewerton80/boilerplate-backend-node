// import { IJwt } from "../../src/app/types/AuthTypes";

import { JwtDto } from "../../src/app/dtos/JwtDto";

declare global {
    namespace Express {
        interface Request {
            user: JwtDto
        }
    }
}

declare global {
    namespace SocketIo {
        interface Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> {
            user: JwtDto
        }
    }
}