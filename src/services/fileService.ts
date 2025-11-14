import neutralino from '@neutralinojs/lib';
import * as buntralino from 'buntralino-client';
import { TeleprompterProject } from '../types';

// Wait for buntralino to be ready
let buntralinoReady = false;
(async () => {
  await buntralino.ready;
  buntralinoReady = true;
})();

async function ensureReady() {
  while (!buntralinoReady) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

export async function loadTextFile(): Promise<string> {
  await ensureReady();
  try {
    const result = await neutralino.os.showOpenDialog('Load Text File', {
      filters: [{ name: 'Text Files', extensions: ['txt'] }],
    }) as string[] | null;
    if (result && Array.isArray(result) && result.length > 0) {
      const fileContent = await buntralino.run('readFile', {
        path: result[0],
      });
      return fileContent as string;
    }
    throw new Error('No file selected');
  } catch (error) {
    throw new Error(`Failed to load text file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function saveTextFile(filename: string, content: string): Promise<void> {
  await ensureReady();
  try {
    const result = await neutralino.os.showSaveDialog('Save Text File', {
      defaultPath: `${filename}.txt`,
      filters: [{ name: 'Text Files', extensions: ['txt'] }],
    }) as string | null;
    if (result) {
      await buntralino.run('writeFile', {
        path: result,
        content,
      });
      return;
    }
    throw new Error('No file path selected');
  } catch (error) {
    throw new Error(`Failed to save text file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function saveProjectFile(filename: string, project: TeleprompterProject): Promise<void> {
  await ensureReady();
  try {
    const result = await neutralino.os.showSaveDialog('Save Project', {
      defaultPath: `${filename}.json`,
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    }) as string | null;
    if (result) {
      await buntralino.run('writeFile', {
        path: result,
        content: JSON.stringify(project, null, 2),
      });
      return;
    }
    throw new Error('No file path selected');
  } catch (error) {
    throw new Error(`Failed to save project: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function loadProjectFile(): Promise<TeleprompterProject> {
  await ensureReady();
  try {
    const result = await neutralino.os.showOpenDialog('Load Project', {
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    }) as string[] | null;
    if (result && Array.isArray(result) && result.length > 0) {
      const fileContent = await buntralino.run('readFile', {
        path: result[0],
      });
      const project = JSON.parse(fileContent as string) as TeleprompterProject;
      return project;
    }
    throw new Error('No file selected');
  } catch (error) {
    throw new Error(`Failed to load project: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function promptForFilename(defaultName: string = 'untitled'): Promise<string | null> {
  const filename = window.prompt('Enter filename (without extension):', defaultName);
  return filename || null;
}

