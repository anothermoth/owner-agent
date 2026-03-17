import path from 'path';
import { readdir } from 'fs/promises';

export default async function(args) {
    const targetPath = path.join(process.cwd(), 'workspaces', args.sessionId);

    const generateTreeRecursive = async (currentPath, prefix) => {
        let treeString = '';
        let entries;

        try {
            // Read and sort entries for consistent output
            entries = (await readdir(currentPath, { withFileTypes: true }))
                .sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            // Handle cases where a subdirectory is not readable
            return `${prefix}└── [Error reading directory]\n`;
        }

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            const isLast = i === entries.length - 1;
            const connector = isLast ? '└── ' : '├── ';
            
            treeString += `${prefix}${connector}${entry.name}\n`;

            if (entry.isDirectory()) {
                const newPrefix = prefix + (isLast ? '    ' : '│   ');
                treeString += await generateTreeRecursive(path.join(currentPath, entry.name), newPrefix);
            }
        }
        return treeString;
    };

    try {
        // Verify the target path exists and is a directory before starting
        const stats = await readdir(targetPath, { withFileTypes: true });
    } catch (error) {
        if (error.code === 'ENOENT') {
            return `Error: Directory not found: ${targetPath}`;
        }
        throw error; // Re-throw other errors (e.g., permissions)
    }

    const treeContent = await generateTreeRecursive(targetPath, '');
    return `${path.basename(targetPath)}\n${treeContent}`;
}