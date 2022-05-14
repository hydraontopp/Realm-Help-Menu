import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { World } from 'mojang-minecraft';
const registerInformation = {
    cancelMessage: true,
    name: 'tpa',
    staff: 'false',
    description: 'Open/Close Teleport Requests',
    usage: '[ <open | create> | close | number ]',
    example: [
        'tpa open',
        'tpa close',
        'tpa 10',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();

    let tpaIntString = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    let tpsopen = ['open', 'create'];
    let tpsclose = ['close', 'cancel'];


    if (sender.scoreTest('togglecommands') === 0) {
        return sender.tellraw(`§¶§7[§eConsole§7]§f ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if (sender.scoreTest('in_combat') === 1) {
        return sender.tellraw(`§¶§7[§eConsole§7]§f ► §6TPA §cunavailable §bwhile in combat`);
    } else if (sender.scoreTest('tp_cooldown') != 0) {
        return sender.tellraw(`§¶§7[§eConsole§7]§f ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`);
    } else if (sender.scoreTest('togglecommands') === 1) {
         if (registerInformation.name.match(chatmsg)) {
            if (tpsopen.includes(args[0])) {
                if (sender.hasTag('has_tpa')) {
                    return sender.tellraw(`§¶§7[§eConsole§7]§f ► §bTPA Channel already created! Your Channel §7:§c "${sender.scoreTest('tpa')}" `);
                } else {
                    sender.runCommand(`scoreboard players random @s tpa 0 11`);
                    sender.runCommand(`tag @s add has_tpa`);
                    sender.tellraw(`§¶§7[§eConsole§7]§f ► §bTPA Channel "${sender.scoreTest('tpa')}" was created`);
                    tellrawStaff(`§¶§7[§eConsole§7]§f ► §d${name} §bopened a tpa channel`);
                }
            }
            else if (tpsclose.includes(args[0])) {
                if (!sender.hasTag('has_tpa')) {
                    return sender.tellraw(`§¶§7[§eConsole§7]§f ► §bThere was no TPA channel to close" `);
                } else {
                    sender.tellraw(`§¶§7[§eConsole§7]§f ► §bTPA Channel "${sender.scoreTest('tpa')}" was closed`);
                    sender.runCommand(`scoreboard players reset @s tpa`);
                    sender.runCommand(`tag @s remove has_tpa`);
                    tellrawStaff(`§¶§7[§eConsole§7]§f ► §d${name} §bclosed their tpa channel manually`);
                }
            }
            else if (tpaIntString.includes(args[0])) { 
                sender.runCommand(`playsound note.pling @s ~ ~ ~`);
                sender.runCommand(`tellraw "${sender.name}" {"rawtext":[{"text":"§¶§7[§eConsole§7]§f ► §6TPA §7: §bSuccessfully teleported to §6"},{"selector":"@p[scores={tpa=${args[0]}}]"}]}`);
                sender.runCommand(`tp @s @p[scores={tpa=${args[0]}}]`);
                sender.runCommand(`execute @p[scores={tpa=${args[0]}}] ~~~ tag @s remove has_tpa`);
                sender.runCommand(`function particle/nether_poof`);
                sender.runCommand(`scoreboard players set @s tp_cooldown 900`);
                sender.runCommand(`execute @p[scores={tpa=${args[0]}}] ~~~ playsound mob.shulker.teleport @s ~~~ 2 1 2`);
                sender.runCommand(`playsound mob.shulker.teleport @s ~~~ 2 2 2`);
                sender.runCommand(`tellraw @a[tag=admin] {"rawtext":[{"text":"§¶§7[§eConsole§7]§f ► §d${name} §bteleported to §d"},{"selector":"@p[scores={tpa=${args[0]}}]"},{"text":" §bvia §eTPA"}]}`);
                sender.runCommand(`execute @p[scores={tpa=${args[0]}}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§7[§eConsole§7]§f ► §6TPA §7: §5${name} §bhas §bSuccessfully teleported! Your TPA Channel is now closed."}]}`);
                sender.runCommand(`execute @p[scores={tpa=${args[0]}}] ~~~ scoreboard players reset @s tpa`);
            } else {
                return sender.tellraw(`§¶§7[§eConsole§7]§f ► §cERROR! §6Usage Example §7:§b§l UAC.tpa [ open | close | number ]`);
            }
        }
        else {
            return sender.tellraw(`§¶§7[§eConsole§7]§f ► §cERROR 2! §6Usage Example §7:§b§l UAC.tpa [ open | close | number ]`);
        }
    }
});