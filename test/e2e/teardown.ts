import { Session } from '../helper/util/session';

module.exports = async () => {
    Session.clearAll();
};
