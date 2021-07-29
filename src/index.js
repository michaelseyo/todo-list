import storage from "./modules/storage.js";
import initForm from "./modules/form.js";
import initInboxTab from './modules/inbox.js';

initInboxTab();
document.body.onload = storage.loadDefault();
initForm();
