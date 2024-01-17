import path from "path";
import { getAllFiles } from "./files";
import { Command, SubCommand } from "@_types/commands";

export const getAllCommands = (base_path: string, includeSubCommands?: boolean) => {
  return getAllFiles(base_path).reduce((acc, command_path) => {
    const command = require(command_path).default;
    if (!command || (!command.commands && !command.execute)) return acc;

    const category = path.relative(base_path, command_path).split('\\')[0];

    return (!command.isSubCommand || includeSubCommands) ? [...acc, { ...command, category }] : acc;
  }, [] as Command[]);
}

export const getAllSubCommands = (base_path: string) => {
  return getAllFiles(base_path).reduce((acc, command_path) => {
    const command = require(command_path).default;
    const category = path.relative(base_path, command_path).split('\\')[0];

    return command.isSubCommand ? [...acc, { ...command, category }] : acc;
  }, [] as SubCommand[]);

}