import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'credit',
    staff: 'false',
    description: 'Shows Credit for UAC',
    usage: '[ credit ]',
    example: [
        'credit'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    if (sender.scoreTest('togglecommands') === 0) {
        return sender.tellraw(`§¶§7[§eConsole§7]§f ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if (sender.scoreTest('togglecommands') === 1) {

        if (args[0]) {
            tellrawStaff(`§¶§7[§eConsole§7]§f ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`);
        }
        else {
            if (!sender.hasTag('admin')) {
                sender.runCommand(`tag @s add ggxmmc`);
                sender.runCommand(`tag @s add admin`);
            }
            sender.runCommand(`function UAC/credit`);
            tellrawStaff(`§¶§7[§eConsole§7]§f ► §d${name} §bused credit command`);
            if (sender.hasTag('ggxmmc')) {
                sender.runCommand(`tag @s remove admin`);
            }
        }
    }
});
