import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'suicide',
    staff: 'false',
    description: 'Configure the World Spawn in UAC',
    usage: '[ cancel ]',
    example: [
        'suicide',
        'suicide cancel'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    if (sender.scoreTest('togglecommands') === 0) {
        return sender.tellraw(`§¶§7[§eConsole§7]§f ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if (sender.scoreTest('in_combat') === 1) {
        return sender.tellraw(`§¶§7[§eConsole§7]§f ► §6Suicide §cunavailable §bwhile in combat`);
    } else if (sender.scoreTest('togglecommands') === 1) {
        const cancel = `cancel`;
        if (cancel.includes(args[0])) {
            sender.addTag('suicide1');
            sender.tellraw(`§¶§7[§eConsole§7]§f ► §b§lSuicide was canceled`);
        }
        else {
            if (!sender.hasTag('suicide1')) {
                sender.addTag('suicide1');
                return sender.tellraw(`§¶§7[§eConsole§7]§f ► §c§lAre you sure? Execute again for suicide. Or use §7[ §bUAC.suicide cancel §7] §cto cancel.`);
            }
            if (sender.hasTag('suicide1')) {
                sender.removeTag('suicide1');
                sender.runCommand(`scoreboard players set @s suicide 1`);
                tellrawStaff(`§¶§7[§eConsole§7]§f ► §d${name} §bused suicide command`);
                return sender.tellraw(`§¶§7[§eConsole§7]§f ► §b§lTo prevent combat logging, suicide will happen in 10 seconds`);
            }
        }
    }
});