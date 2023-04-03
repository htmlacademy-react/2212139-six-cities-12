import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Notification } from '../../types/notification';


export const getNotifications = (state: State): Notification[] => state[NameSpace.Notifications].notifications;
