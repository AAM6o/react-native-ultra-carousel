/**
 * @file File system utilities for CLI
 * @description Helpers for file operations in the CLI tool
 */

import fs from 'fs-extra';
import path from 'path';

/**
 * Checks if a package.json exists in the given directory.
 *
 * @param dir - Directory to check
 * @returns True if package.json exists
 */
export const hasPackageJson = (dir: string): boolean => {
  return fs.existsSync(path.join(dir, 'package.json'));
};

/**
 * Reads a package.json and returns the parsed object.
 *
 * @param dir - Directory containing package.json
 * @returns Parsed package.json or null
 */
export const readPackageJson = (dir: string): Record<string, unknown> | null => {
  const filePath = path.join(dir, 'package.json');
  if (!fs.existsSync(filePath)) return null;
  return fs.readJsonSync(filePath) as Record<string, unknown>;
};

/**
 * Checks if a dependency is listed in the project's package.json.
 *
 * @param dir - Project directory
 * @param dep - Dependency name to check
 * @returns True if the dependency is listed
 */
export const hasDependency = (dir: string, dep: string): boolean => {
  const pkg = readPackageJson(dir);
  if (!pkg) return false;

  const deps = pkg.dependencies as Record<string, string> | undefined;
  const devDeps = pkg.devDependencies as Record<string, string> | undefined;
  const peerDeps = pkg.peerDependencies as Record<string, string> | undefined;

  return Boolean(deps?.[dep] || devDeps?.[dep] || peerDeps?.[dep]);
};
