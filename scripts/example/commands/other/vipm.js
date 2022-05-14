import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'vip',
    staff: 'false',
    description: 'Enables/Disables vip effects for the player',
    usage: '[ vip ]',
    example: [
        'vip'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    if(args[0])
    {
        tellrawStaff(`§¶§7[§eConsole§7]§f ► §e§lYou found a Easter Egg! Yeet! Hello There. Let this be our little secret ;)`);
    }
    else {
        sender.runCommand( `function UAC/asset/uac_vip` );
    }
});
