import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'help',
    staff: 'false',
    description: 'Get the list of Commands!',
    usage: 'help [command name]',
    example: [
        'help',
        'help tpa'
    ]
};

Server.command.register(registerInformation, (data, args) => {
    try {
        const sender = data.sender;
        const name = sender.getName();
        const cmdList = Server.command.getAll();
        const cmdstaff = Server.command.getAllStaff();

        const plrcmd = cmdList.join(', ');
        const stfcmd = cmdstaff.join(', ');


        console.warn(cmdList);
        //sender.tellraw(`§bCustom Command prefix§f: §a${Server.command.prefix}\n§bType §a${Server.command.prefix}help §f[command name] §bfor more information on that command!\n§bCustom Command List: §l§c${cmdList.join(', ')}`);
        if (!args[0]) {
            if (sender.hasTag('admin')) { 
                return sender.tellraw(`§4Help Menu§f| §cPrefix: §e${Server.command.prefix}\n§4Typing §e${Server.command.prefix}help §f[Command Name] §4for information on that Command!\n§cCommands List: §c${plrcmd} §r\n§6Staff Commands§c${stfcmd}`);
            } else {
                return sender.tellraw(`§4Help Menu§f| §cPrefix: §e${Server.command.prefix}\n§4Typing §e${Server.command.prefix}help §f[Command Name] §4for information on that Command!\n§cCommands List: §l§c${plrcmd}`);
            }
        }
        const cmdInfo = Server.command.getRegistration(args[0]);
        if (!cmdInfo)
            return sender.tellraw("§cI couldn't find the command...");
        let string = `\n§eCommand§f: §a${Server.command.prefix}§l§c${cmdInfo.name}§r\n`;
        if (cmdInfo.aliases)
            string += `§ePerpose§f: §c${cmdInfo.aliases.join('§r, ')}§r\n`;
        if (cmdInfo.description)
            string += `§eInformation§f: ${cmdInfo.description}\n`;
        if (cmdInfo.usage)
            string += `§eUsage§f: §a${Server.command.prefix}§f${cmdInfo.name} ${cmdInfo.usage}\n`;
        if (cmdInfo.example)
            string += `§eExample§f: §a${Server.command.prefix}§f${cmdInfo.example.join(`\n${Server.command.prefix}§f`)}`;
        return sender.tellraw(string);
    } catch (error) {
        console.warn(error, error.stack);
    }
});
