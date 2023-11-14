import { CalendarReply } from "./CalendarReply";
export interface CalendarEvent {
    id: number;
    name: string,   
    dateTime:Date,
    replies:CalendarReply[]
  }