import path from "path";
import { getAllFiles } from "./files";
import { Command, SubCommand } from "@_types/commands";

export const getAllCommands = (base_path: string, includeSubCommands?: boolean) => {
  return getAllFiles(base_path).reduce((acc, command_path) => {
    const command = require(command_path).default;
    if (!command || (!command.commands && !command.execute)) return acc;

    const categories = path.relative(base_path, command_path).split("\\").slice(0, -1);

    return !command.isSubCommand || includeSubCommands ? [...acc, { ...command, categories }] : acc;
  }, [] as Command[]);
};

export const getAllSubCommands = (base_path: string) => {
  return getAllFiles(base_path).reduce((acc, command_path) => {
    const command = require(command_path).default;
    const categories = path.relative(base_path, command_path).split("\\").slice(0, -1);

    return command.isSubCommand ? [...acc, { ...command, categories }] : acc;
  }, [] as SubCommand[]);
};
