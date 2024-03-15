import cron from "node-cron";
import Invite from "../models/invite";

const cronJob = () => {
    cron.schedule('*/20 * * * *', async () => {
        const tenMinutesAgo = new Date();
        tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

        await Invite.updateMany({ status: 'reading', updatedAt: { $lt: tenMinutesAgo } }, { $set: { status: 'unread' } });
        // console.log('Invites updated.');
    });
}

export default cronJob;