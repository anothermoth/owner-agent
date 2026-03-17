window.buildWorkspaceProject = async function(projectName, files) {
    await globalThis.shesh._ensureFS();
    const fs = window.fs.promises;
    try { await fs.mkdir('/projects/' + projectName, { recursive: true }); } catch (e) { }
    
    for (const [filename, content] of Object.entries(files)) {
        await fs.writeFile('/projects/' + projectName + '/' + filename, content);
    }
    
    globalThis.shesh.activeProject = projectName;
    const container = document.getElementById('container');
    container.style.margin = '0'; 
    container.style.padding = '0'; 
    container.style.height = '100vh'; 
    container.style.overflow = 'hidden';
    container.innerHTML = '<iframe src="/~fs/projects/' + projectName + '/index.html" style="width: 100%; height: 100%; border: none; display: block; background: #111;"></iframe>';
};