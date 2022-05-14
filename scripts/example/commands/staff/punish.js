import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, tellrawServer, queryTopSolid } from '../../../library/utils/prototype.js';
import { world, Location } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');
const registerInformation = {
    cancelMessage: true,
    name: 'punish',
    staff: 'true',
    description: 'Warns the player while clearing their inventory and ender chest',
    usage: '[ @player ]',
    example: [
        'punish @player'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        let input = args.join(' ').replace('@', '').replace(/"/g, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        //let playername = playerfound.getName();
        const { sender } = chatmsg;
        const name = sender.getName();
        
        console.warn(sender.queryTopSolid());
        if (sender.hasTag('admin')) {
            if (args[0]) {
                if(!playerfound) {
                    return sender.tellraw(`§¶§7[§eConsole§7]§f ► §cPlayer not found`);  
                }
                else {
                    tellrawStaff(`§¶§7[§eConsole§7]§f ► §d${playerfound.getName()}§b was punished by §d${name}`);
                    sender.runCommand(`execute "${playerfound.getName()}" ~~~ function UAC/punish`);  
                }
            } else {
                sender.tellraw(`§¶§7[§eConsole§7]§f ► §cNo player specified`);
            }
        } else {
            return sender.tellraw(`§¶§7[§eConsole§7]§f ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
