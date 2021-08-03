import storage from "./modules/storage.js";
import initForm from "./modules/form.js";
import initInboxTab from './modules/inbox.js';
import initNext7DaysTab from './modules/next7days.js';
import initTodayTab from './modules/today.js';

initInboxTab();
initNext7DaysTab();
initTodayTab();

document.body.onload = storage.loadDefault();
initForm();
