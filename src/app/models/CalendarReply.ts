import { CalendarUser } from "./CalendarUser"
import { ReplyType } from "./ReplyType"
export interface CalendarReply {  
    id:number,
    user: CalendarUser,   
    reply:ReplyType
  }