const execa = require("execa");
const fs = require("fs");
(async () => {
    try {
        await execa("git", ["checkout", "--orphan", "pages"]);
        console.log("Building started...");
        await execa("npm", ["run", "build-only"]);
        const folderName = fs.existsSync("chat-app/dist") ? "chat-app/dist" : "chat-app/build";
        await execa("git", ["--work-tree", folderName, "add", "--all"]);
        await execa("git", ["--work-tree", folderName, "commit", "-m", "pages"]);
        console.log("Pushing to pages...");
        await execa("git", ["push", "origin", "HEAD:pages", "--force"]);
        await execa("rm", ["-r", folderName]);
        await execa("git", ["checkout", "-f", "master"]);
        await execa("git", ["branch", "-D", "pages"]);
        console.log("Successfully deployed, check your settings");
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
})();