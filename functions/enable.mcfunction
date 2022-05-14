execute @s[tag=admin] ~~~ scoreboard players add togglecommands TOG 1
execute @s[tag=admin] ~~~ scoreboard players operation @a TOG = togglecommandsdummy TOG

#turn on
execute @s[tag=admin,scores={TOG=1}] ~~~ scoreboard players set togglecommandsdummy togglecommands 1
execute @s[tag=admin,scores={TOG=1}] ~~~ scoreboard players operation @a togglecommands = togglecommandsdummy togglecommands
execute @s[tag=admin,scores={TOG=1}] ~~~ tellraw @a[tag=admin] {"rawtext":[{"text":"§¶§7[§eConsole§7]§f §¶§b► §aHELP MENU WAS TURNED ON by §d"},{"selector":"@s"}]}
tellraw @s[tag=admin,scores={has_gt=0,TOG=1}] {"rawtext":[{"text":"§¶§7[§eConsole§7]§f ► §6Gametest Features §7: §4NOT ENABLED §7|| §4HELP MENU FAILED"}]}
#turn off
execute @s[tag=admin,scores={TOG=2}] ~~~ scoreboard players set togglecommandsdummy togglecommands 0
execute @s[tag=admin,scores={TOG=2}] ~~~ scoreboard players operation @a togglecommands = togglecommandsdummy togglecommands
execute @s[tag=admin,scores={TOG=2}] ~~~ tellraw @a[tag=admin] {"rawtext":[{"text":"§¶§7[§eConsole§7]§f §¶§b► §cHELP MENU WAS TURNED OFF by §d"},{"selector":"@s"}]}
execute @s[tag=admin,scores={TOG=2}] ~~~ scoreboard players set togglecommandsdummy TOG 0
#Deny Nonstaff
execute @s[tag=!admin] ~~~ tellraw @s {"rawtext":[{"text":"§¶§7[§eConsole§7]§f §¶§b► Access §cDENIED§7! §bOnly operators can use this command"}]}
execute @s[tag=!admin] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=admin] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 27